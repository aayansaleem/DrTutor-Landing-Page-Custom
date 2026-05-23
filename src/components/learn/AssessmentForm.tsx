import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { User, Phone, Mail, Cake, ChevronDown, Loader2, ArrowRight, Check } from 'lucide-react';
import { submitLead, fireLeadConversion } from '@/lib/leads';
import { LiveWrite } from './primitives';

interface FormState {
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  childAge: string;
}
const empty: FormState = { parentName: '', parentPhone: '', parentEmail: '', childAge: '' };

const AGES = Array.from({ length: 15 }, (_, i) => i + 4); // 4..18

interface FieldRowProps {
  id: string;
  label: string;
  type: string;
  value: string;
  placeholder: string;
  autoComplete: string;
  inputMode?: 'text' | 'tel' | 'email';
  error?: string;
  icon: React.ReactNode;
  onChange: (v: string) => void;
}

const FieldRow: React.FC<FieldRowProps> = ({ id, label, type, value, placeholder, autoComplete, inputMode, error, icon, onChange }) => {
  const [focused, setFocused] = useState(false);
  return (
    <div>
      <label htmlFor={id} className="block font-body font-semibold text-xs text-brand-navy/65 mb-1.5">{label}</label>
      <div
        className="relative rounded-xl bg-white transition-all duration-200"
        style={{
          border: `1.5px solid ${error ? 'var(--brand-coral)' : focused ? 'var(--brand-teal)' : 'var(--border-default)'}`,
          boxShadow: focused && !error ? '0 0 0 4px rgba(15,165,165,0.10)' : 'none',
        }}
      >
        <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-teal/70 pointer-events-none">{icon}</span>
        <input
          id={id}
          name={id.split('-')[0]}
          type={type}
          inputMode={inputMode}
          autoComplete={autoComplete}
          value={value}
          placeholder={placeholder}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${id}-err` : undefined}
          className="w-full bg-transparent outline-none font-body text-sm text-brand-navy placeholder-brand-navy/35 pl-10 pr-4 py-3.5"
        />
      </div>
      <AnimatePresence>
        {error && (
          <motion.p
            id={`${id}-err`}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="font-body text-xs mt-1.5 pl-1 overflow-hidden"
            style={{ color: 'var(--brand-coral)' }}
          >{error}</motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

/** Custom modern dropdown — never a raw native <select>. Keyboard + click,
 *  Framer Motion popover, on-brand, accessible (role=listbox). */
const AgeDropdown: React.FC<{
  value: string;
  error?: string;
  onChange: (v: string) => void;
  instanceId: string;
}> = ({ value, error, onChange, instanceId }) => {
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const listId = `age-list-${instanceId}`;

  // close on outside click / escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => { document.removeEventListener('mousedown', onDown); document.removeEventListener('keydown', onKey); };
  }, [open]);

  return (
    <div>
      <label htmlFor={`age-btn-${instanceId}`} className="block font-body font-semibold text-xs text-brand-navy/65 mb-1.5">Child's age</label>
      <div ref={wrap} className="relative">
        <button
          id={`age-btn-${instanceId}`}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={listId}
          onClick={() => setOpen((o) => !o)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full flex items-center justify-between gap-2 rounded-xl bg-white pl-10 pr-3.5 py-3.5 font-body text-sm text-brand-navy transition-all duration-200 cursor-pointer"
          style={{
            border: `1.5px solid ${error ? 'var(--brand-coral)' : focused || open ? 'var(--brand-teal)' : 'var(--border-default)'}`,
            boxShadow: (focused || open) && !error ? '0 0 0 4px rgba(15,165,165,0.10)' : 'none',
          }}
        >
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-brand-teal/70 pointer-events-none">
            <Cake size={17} />
          </span>
          <span className={value ? '' : 'text-brand-navy/40'}>
            {value ? `${value} years old` : 'Select your child’s age'}
          </span>
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }} className="text-brand-navy/50">
            <ChevronDown size={17} />
          </motion.span>
        </button>
        <AnimatePresence>
          {open && (
            <motion.ul
              id={listId}
              role="listbox"
              initial={{ opacity: 0, y: -6, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
              className="absolute z-30 left-0 right-0 mt-1.5 max-h-64 overflow-y-auto rounded-xl bg-white p-1.5"
              style={{ border: '1px solid var(--border-default)', boxShadow: '0 16px 40px rgba(3,26,53,0.14)' }}
            >
              {AGES.map((age) => {
                const selected = String(age) === value;
                return (
                  <li key={age} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onClick={() => { onChange(String(age)); setOpen(false); }}
                      className="w-full flex items-center justify-between px-3 py-2 rounded-lg font-body text-sm text-brand-navy transition-colors hover:bg-brand-teal-lighter cursor-pointer"
                      style={{ backgroundColor: selected ? 'var(--brand-teal-light)' : 'transparent' }}
                    >
                      <span>{age} years old</span>
                      {selected && <Check size={15} className="text-brand-teal" />}
                    </button>
                  </li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="font-body text-xs mt-1.5 pl-1" style={{ color: 'var(--brand-coral)' }}>{error}</motion.p>
        )}
      </AnimatePresence>
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
    if (!form.childAge) e.childAge = "Pick your child's age";
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
      childAge: parseInt(form.childAge, 10),
    });
    setSubmitting(false);
    if (result.ok) {
      fireLeadConversion();
      setDone(true);
    } else {
      setErrors((p) => ({ ...p, submit: 'Something went wrong. Please try again, or message us on WhatsApp.' }));
    }
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
              We'll be in touch shortly to arrange a time that suits you. Keep an eye on your phone and email.
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
              <FieldRow id={`parentName-${instanceId}`} label="Parent or guardian name" type="text" placeholder="e.g. Sarah Smith" autoComplete="name" value={form.parentName} icon={<User size={17} />} error={errors.parentName} onChange={(v) => update('parentName', v)} />
              <FieldRow id={`parentPhone-${instanceId}`} label="Phone number" type="tel" placeholder="07700 900000" inputMode="tel" autoComplete="tel" value={form.parentPhone} icon={<Phone size={17} />} error={errors.parentPhone} onChange={(v) => update('parentPhone', v)} />
              <FieldRow id={`parentEmail-${instanceId}`} label="Email address" type="email" placeholder="sarah@example.com" inputMode="email" autoComplete="email" value={form.parentEmail} icon={<Mail size={17} />} error={errors.parentEmail} onChange={(v) => update('parentEmail', v)} />
              <AgeDropdown value={form.childAge} error={errors.childAge} onChange={(v) => update('childAge', v)} instanceId={instanceId} />
            </div>

            {errors.submit && (
              <p className="font-body text-xs mt-4 rounded-xl px-3 py-2.5" style={{ color: 'var(--brand-coral)', backgroundColor: 'rgba(249,112,102,0.08)' }}>
                {errors.submit}
              </p>
            )}

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
              No card needed. We'll only use your details to arrange the assessment.
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
};
