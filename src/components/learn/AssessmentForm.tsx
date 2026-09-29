import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { User, Phone, Mail, Smile, BookOpen, ChevronDown, Loader2, ArrowRight, Check } from 'lucide-react';
import { submitLead, fireLeadConversion } from '@/lib/leads';
import { FALLBACK_SUBJECTS, loadSubjects, type SubjectOption } from '@/lib/subjects';
import { TurnstileField } from './TurnstileField';
import { LiveWrite } from './primitives';

interface FormState {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  childFirstName: string;
  subject: string;
}
const empty: FormState = { parentName: '', parentPhone: '', parentEmail: '', childFirstName: '', subject: '' };

interface FieldRowProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: 'text' | 'tel' | 'email';
  autoCapitalize?: 'off' | 'words';
  maxLength?: number;
  error?: string;
  disabled?: boolean;
  icon: React.ReactNode;
  onChange: (v: string) => void;
}

/** Shared error line under a field, so every field fails the same way. */
const FieldError: React.FC<{ id: string; error?: string }> = ({ id, error }) => (
  <AnimatePresence>
    {error && (
      <motion.p
        id={id}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: 1, height: 'auto' }}
        exit={{ opacity: 0, height: 0 }}
        className="font-body text-xs mt-1.5 pl-1 overflow-hidden"
        style={{ color: 'var(--brand-coral)' }}
      >{error}</motion.p>
    )}
  </AnimatePresence>
);

/** Border + glow for every field shell: coral on error, teal while focused. */
const shellStyle = (error: boolean, active: boolean): React.CSSProperties => ({
  border: `1.5px solid ${error ? 'var(--brand-coral)' : active ? 'var(--brand-teal)' : 'var(--border-default)'}`,
  boxShadow: active && !error ? '0 0 0 4px rgba(15,165,165,0.10)' : 'none',
});

const FieldRow: React.FC<FieldRowProps> = ({ id, label, type, value, placeholder, autoComplete, inputMode, autoCapitalize, maxLength, error, disabled, icon, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block font-body font-semibold text-xs text-brand-navy/65 mb-1.5">{label}</label>
      <div
        className={`relative rounded-xl bg-white transition-all duration-200 ${disabled ? 'opacity-60' : ''}`}
        style={shellStyle(Boolean(error), focused)}
      >
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-teal/70 pointer-events-none">{icon}</span>
        <input
          id={id}
          name={id.split('-')[0]}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          autoCapitalize={autoCapitalize}
          maxLength={maxLength}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className="w-full bg-transparent outline-none font-body text-base sm:text-sm text-brand-navy placeholder-brand-navy/35 pl-10 pr-4 py-3.5 disabled:cursor-not-allowed"
        />
      </div>
      <FieldError id={`${id}-err`} error={error} />
    </div>
  );
};

const TYPEAHEAD_RESET_MS = 600;

/** Custom listbox, never a raw native <select>. Follows the WAI-ARIA
 *  select-only combobox pattern: focus stays on the button, the highlighted
 *  option is announced through aria-activedescendant. Keyboard: arrows, Home,
 *  End, Enter or Space to choose, Escape or Tab to close, and type-ahead (type
 *  "ch" to jump to Chemistry). Pointer events, so taps work on phones.
 *  Subjects come from the platform lookups list (see lib/subjects.ts); while it
 *  loads the built-in list is usable straight away. */
const SubjectDropdown: React.FC<{
  value: string;
  options: SubjectOption[];
  loading: boolean;
  error?: string;
  disabled?: boolean;
  onChange: (v: string) => void;
  instanceId: string;
}> = ({ value, options, loading, error, disabled, onChange, instanceId }) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const typed = useRef({ text: '', at: 0 });
  const buttonId = `subject-btn-${instanceId}`;
  const labelId = `subject-label-${instanceId}`;
  const listId = `subject-list-${instanceId}`;
  const errorId = `subject-${instanceId}-err`;
  const selected = options.find((o) => o.code === value);

  // close on an outside tap or click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('pointerdown', onDown);
    return () => document.removeEventListener('pointerdown', onDown);
  }, [open]);

  // keep the highlighted option in view while arrowing through the list
  useEffect(() => {
    if (!open) return;
    document.getElementById(`${listId}-${active}`)?.scrollIntoView({ block: 'nearest' });
  }, [open, active, listId]);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  const openAt = (index?: number) => {
    const current = options.findIndex((o) => o.code === value);
    setActive(index ?? (current >= 0 ? current : 0));
    setOpen(true);
  };

  const choose = (i: number) => {
    const option = options[i];
    if (!option) return;
    onChange(option.code);
    setOpen(false);
  };

  /** Find the next subject starting with what has been typed recently. */
  const typeAhead = (char: string) => {
    const now = Date.now();
    const text = now - typed.current.at > TYPEAHEAD_RESET_MS ? char : typed.current.text + char;
    typed.current = { text, at: now };
    const needle = text.toLowerCase();
    const repeat = needle.split('').every((c) => c === needle[0]);
    const start = open ? active : Math.max(0, options.findIndex((o) => o.code === value));
    const ordered = [...options.slice(start + 1), ...options.slice(0, start + 1)];
    const match =
      ordered.find((o) => o.name.toLowerCase().startsWith(needle)) ??
      (repeat ? ordered.find((o) => o.name.toLowerCase().startsWith(needle[0])) : undefined);
    if (!match) return;
    const index = options.indexOf(match);
    if (open) setActive(index);
    else openAt(index);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (!options.length) return;
    switch (e.key) {
      case 'ArrowDown':
      case 'ArrowUp': {
        e.preventDefault();
        if (!open) { openAt(); return; }
        const step = e.key === 'ArrowDown' ? 1 : -1;
        setActive((i) => Math.min(options.length - 1, Math.max(0, i + step)));
        return;
      }
      case 'Home':
      case 'End':
        if (!open) return;
        e.preventDefault();
        setActive(e.key === 'Home' ? 0 : options.length - 1);
        return;
      case 'PageDown':
      case 'PageUp':
        if (!open) return;
        e.preventDefault();
        setActive((i) => Math.min(options.length - 1, Math.max(0, i + (e.key === 'PageDown' ? 5 : -5))));
        return;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (open) choose(active);
        else openAt();
        return;
      case 'Escape':
        if (!open) return;
        e.preventDefault();
        setOpen(false);
        return;
      case 'Tab':
        setOpen(false);
        return;
      default:
        if (e.key.length === 1 && !e.ctrlKey && !e.metaKey && !e.altKey) {
          e.preventDefault();
          typeAhead(e.key);
        }
    }
  };

  return (
    <div>
      <label id={labelId} htmlFor={buttonId} className="block font-body font-semibold text-xs text-brand-navy/65 mb-1.5">Subject</label>
      <div ref={wrap} className="relative">
        <button
          id={buttonId}
          type="button"
          role="combobox"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          aria-labelledby={labelId}
          aria-activedescendant={open ? `${listId}-${active}` : undefined}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? errorId : undefined}
          aria-busy={loading}
          disabled={disabled}
          onClick={() => (open ? setOpen(false) : openAt())}
          onKeyDown={onKeyDown}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className={`relative w-full min-h-[50px] flex items-center justify-between gap-2 rounded-xl bg-white pl-10 pr-3.5 py-3.5 font-body text-base sm:text-sm text-left text-brand-navy transition-all duration-200 outline-none cursor-pointer disabled:cursor-not-allowed ${disabled ? 'opacity-60' : ''}`}
          style={shellStyle(Boolean(error), focused || open)}
        >
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-teal/70 pointer-events-none">
            <BookOpen size={17} />
          </span>
          <span className={`truncate ${selected ? '' : 'text-brand-navy/40'}`}>
            {selected ? selected.name : 'Choose a subject'}
          </span>
          <span className="flex-shrink-0 text-brand-navy/50" aria-hidden="true">
            {loading ? (
              <Loader2 size={16} className="animate-spin text-brand-teal/70" />
            ) : (
              <motion.span className="block" animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
                <ChevronDown size={17} />
              </motion.span>
            )}
          </span>
        </button>
        {loading && <span className="sr-only" role="status">Loading subjects</span>}
        <AnimatePresence>
          {open && (
            <motion.ul
              id={listId}
              role="listbox"
              aria-labelledby={labelId}
              tabIndex={-1}
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-30 left-0 right-0 mt-1.5 max-h-64 overflow-y-auto overscroll-contain rounded-xl bg-white p-1.5"
              style={{ border: '1px solid var(--border-default)', boxShadow: '0 16px 40px rgba(3,26,53,0.14)' }}
            >
              {options.map((option, i) => {
                const isSelected = option.code === value;
                const isActive = i === active;
                return (
                  <li
                    key={option.code}
                    id={`${listId}-${i}`}
                    role="option"
                    aria-selected={isSelected}
                    onPointerDown={(e) => e.preventDefault()}
                    onPointerEnter={(e) => { if (e.pointerType === 'mouse') setActive(i); }}
                    onClick={() => choose(i)}
                    className="w-full min-h-11 sm:min-h-0 flex items-center justify-between gap-2 px-3 py-2 rounded-lg font-body text-base sm:text-sm text-brand-navy transition-colors cursor-pointer select-none"
                    style={{
                      backgroundColor: isSelected
                        ? 'var(--brand-teal-light)'
                        : isActive
                          ? 'var(--brand-teal-lighter)'
                          : 'transparent',
                    }}
                  >
                    <span>{option.name}</span>
                    {isSelected && <Check size={15} className="flex-shrink-0 text-brand-teal" />}
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <FieldError id={errorId} error={error} />
    </div>
  );
};

interface AssessmentFormProps {
  instanceId: string;
  heading?: string;
  subheading?: string;
  className?: string;
}

export const AssessmentForm: React.FC<AssessmentFormProps> = ({ instanceId, heading, subheading, className = '' }) => {
  const reduce = useReducedMotion();
  const [form, setForm] = useState<FormState>(empty);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState | 'submit', string>>>({});
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [marketingConsent, setMarketingConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string | null>(null);
  const [challengeNonce, setChallengeNonce] = useState(0);
  // Honeypot. Hidden from parents, irresistible to form-filling scripts.
  const [website, setWebsite] = useState('');
  // The built-in list is usable at once; the platform list replaces it when
  // it arrives. A failure is silent: the built-in list simply stays.
  const [subjects, setSubjects] = useState<SubjectOption[]>(FALLBACK_SUBJECTS);
  const [subjectsLoading, setSubjectsLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    loadSubjects()
      .then((list) => {
        if (!alive) return;
        setSubjects(list);
        // A choice made from the built-in list that the platform list does not
        // offer is cleared, so we never send a subject the server rejects.
        setForm((p) => (p.subject && !list.some((o) => o.code === p.subject) ? { ...p, subject: '' } : p));
      })
      .finally(() => { if (alive) setSubjectsLoading(false); });
    return () => { alive = false; };
  }, []);

  const update = (key: keyof FormState, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((p) => {
      if (!p[key]) return p;
      const n = { ...p };
      delete n[key];
      return n;
    });
  };

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.parentName.trim()) e.parentName = 'Please enter your name';
    if (!form.parentPhone.trim()) e.parentPhone = 'Please enter a phone number';
    if (!form.parentEmail.trim()) e.parentEmail = 'Please enter your email';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.parentEmail)) e.parentEmail = 'That email looks off';
    if (!form.childFirstName.trim()) e.childFirstName = "Please enter your child's first name";
    if (!form.subject) e.subject = 'Please choose a subject';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (submitting) return;
    if (!validate()) return;
    setSubmitting(true);
    const result = await submitLead({
      parentName: form.parentName.trim(),
      parentPhone: form.parentPhone.trim(),
      parentEmail: form.parentEmail.trim(),
      childFirstName: form.childFirstName.trim(),
      subject: form.subject,
      marketingConsent,
      turnstileToken,
      honeypot: website,
    });
    setSubmitting(false);
    if (result.ok) {
      fireLeadConversion();
      setDone(true);
      return;
    }

    // A Turnstile token is single use, so any failed attempt needs a fresh one.
    setTurnstileToken(null);
    setChallengeNonce((n) => n + 1);

    const message =
      result.error === 'bot-check'
        ? 'We could not confirm you are a real person. Please try again, or message us on WhatsApp.'
        : result.error === 'rate-limited'
          ? 'That is a few too many tries from this connection. Please wait a little, or message us on WhatsApp.'
          : 'Something went wrong. Please try again, or message us on WhatsApp.';
    setErrors((p) => ({ ...p, submit: message }));
  };

  return (
    <div
      className={`rounded-3xl bg-white p-6 sm:p-7 ${className}`}
      style={{ boxShadow: '0 20px 50px -12px rgba(3,26,53,0.18), 0 6px 16px -4px rgba(15,165,165,0.10)', border: '1px solid rgba(15,165,165,0.10)' }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="text-center py-6">
            <motion.div
              initial={{ scale: reduce ? 1 : 0, rotate: reduce ? 0 : -30 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200, damping: 14, delay: 0.05 }}
              className="relative mx-auto mb-5 w-20 h-20"
            >
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)',
                  boxShadow: '0 14px 30px rgba(15,165,165,0.35)',
                }}
              />
              <div
                className="absolute inset-1.5 rounded-full"
                style={{ border: '2px solid rgba(255,255,255,0.55)' }}
              />
              <svg
                viewBox="0 0 24 24"
                className="absolute inset-0 w-full h-full p-5"
                fill="none"
                stroke="white"
                strokeWidth={3.5}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            </motion.div>
            <h3 className="font-headline font-semibold text-2xl text-brand-navy mb-2">
              <LiveWrite text="You're booked in" speed={45} caret={false} />
            </h3>
            <p className="font-body text-sm leading-relaxed text-brand-navy/65 max-w-xs mx-auto">
              Thanks. We'll email you your assessment time, a Google Meet link, and a link to set up your account.
            </p>
          </motion.div>
        ) : (
          <motion.form key="form" onSubmit={handleSubmit} noValidate initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {heading && (
              <div className="mb-5">
                <h3 className="font-headline font-semibold text-xl text-brand-navy leading-tight">{heading}</h3>
                {subheading && <p className="font-body text-sm text-brand-navy/55 mt-1">{subheading}</p>}
              </div>
            )}

            <div className="space-y-3.5">
              <FieldRow id={`parentName-${instanceId}`} label="Parent or guardian name" type="text" placeholder="e.g. Sarah Smith" autoComplete="name" autoCapitalize="words" maxLength={160} value={form.parentName} icon={<User size={17} />} error={errors.parentName} disabled={submitting} onChange={(v) => update('parentName', v)} />
              <FieldRow id={`parentEmail-${instanceId}`} label="Email address" type="email" placeholder="sarah@example.com" inputMode="email" autoComplete="email" autoCapitalize="off" maxLength={254} value={form.parentEmail} icon={<Mail size={17} />} error={errors.parentEmail} disabled={submitting} onChange={(v) => update('parentEmail', v)} />
              <FieldRow id={`parentPhone-${instanceId}`} label="Phone number" type="tel" placeholder="07700 900000" inputMode="tel" autoComplete="tel" maxLength={32} value={form.parentPhone} icon={<Phone size={17} />} error={errors.parentPhone} disabled={submitting} onChange={(v) => update('parentPhone', v)} />
              <FieldRow id={`childFirstName-${instanceId}`} label="Child's first name" type="text" placeholder="e.g. Amelia" autoComplete="off" autoCapitalize="words" maxLength={80} value={form.childFirstName} icon={<Smile size={17} />} error={errors.childFirstName} disabled={submitting} onChange={(v) => update('childFirstName', v)} />
              <SubjectDropdown value={form.subject} options={subjects} loading={subjectsLoading} error={errors.subject} disabled={submitting} onChange={(v) => update('subject', v)} instanceId={instanceId} />
            </div>

            {errors.submit && (
              <p className="font-body text-xs mt-4 rounded-xl px-3 py-2.5" style={{ color: 'var(--brand-coral)', backgroundColor: 'rgba(249,112,102,0.08)' }}>
                {errors.submit}
              </p>
            )}

            <button
              type="button"
              role="checkbox"
              aria-checked={marketingConsent}
              disabled={submitting}
              onClick={() => setMarketingConsent((c) => !c)}
              className="mt-5 flex items-start gap-2.5 text-left w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-60"
            >
              <span
                className="mt-px flex-shrink-0 w-[18px] h-[18px] rounded-md flex items-center justify-center transition-all duration-200"
                style={{
                  border: `1.5px solid ${marketingConsent ? 'var(--brand-teal)' : 'var(--border-default)'}`,
                  backgroundColor: marketingConsent ? 'var(--brand-teal)' : '#FFFFFF',
                }}
              >
                <AnimatePresence>
                  {marketingConsent && (
                    <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }} transition={{ duration: 0.15 }}>
                      <Check size={13} className="text-white" strokeWidth={3} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="font-body text-[11px] leading-relaxed text-brand-navy/55">
                Yes, DrTutor can contact me about my enquiry and use my details to measure our advertising. Optional, and you can opt out anytime.
              </span>
            </button>

            {/* Honeypot. Off-screen and skipped by keyboard + screen readers, so
                only a script that fills every input will ever put a value here. */}
            <div aria-hidden="true" className="absolute -left-[9999px] top-0 h-0 w-0 overflow-hidden">
              <label htmlFor={`${instanceId}-website`}>Website</label>
              <input
                id={`${instanceId}-website`}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <TurnstileField onToken={setTurnstileToken} resetSignal={challengeNonce} />
            </div>

            <motion.button
              type="submit"
              disabled={submitting}
              whileTap={reduce ? undefined : { scale: 0.98 }}
              className="group relative mt-5 w-full py-4 rounded-xl font-body font-semibold text-sm text-white flex items-center justify-center gap-2 overflow-hidden disabled:cursor-not-allowed"
              style={{ background: 'linear-gradient(135deg, var(--brand-teal) 0%, var(--brand-teal-dark) 100%)', boxShadow: '0 10px 24px rgba(15,165,165,0.32)' }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.30) 50%, transparent 70%)' }} />
              <span className="relative flex items-center gap-2">
                {submitting ? (<><Loader2 size={17} className="animate-spin" /> Booking your slot...</>) : (<>Book my free assessment <ArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" /></>)}
              </span>
            </motion.button>

            <p className="font-body text-[11px] text-center text-brand-navy/45 mt-3 leading-relaxed">
              No card needed. We only use these details to arrange your child's assessment.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
