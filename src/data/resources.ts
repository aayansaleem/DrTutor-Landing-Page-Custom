export interface TeachingTechnique {
  id: string;
  label: string;
}

export interface TeachingCycleStep {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface LessonFeature {
  id: string;
  title: string;
  description: string;
  image: string;
}

export const teachingTechniques: TeachingTechnique[] = [
  { id: '1', label: 'Warm Call' },
  { id: '2', label: 'Check for Understanding' },
  { id: '3', label: 'No Opt Out' },
  { id: '4', label: 'Right is Right' },
  { id: '5', label: 'Wait Time' },
];

export const teachingCycleSteps: TeachingCycleStep[] = [
  {
    id: '1',
    title: 'I Do',
    subtitle: 'MODEL',
    description:
      'The teacher introduces and clearly demonstrates the new concept, breaking it down step by step. This stage sets a strong foundation, helping students see exactly how to approach the task with confidence.',
    image: 'kL3NvrCU6yuaDbl1rBeFlKlKaqY.avif',
  },
  {
    id: '2',
    title: 'We Do',
    subtitle: 'GUIDED PRACTICE',
    description:
      'Teacher and students work through the concept together, applying what was modelled. With support and feedback, learners build their understanding while developing key skills in a collaborative setting.',
    image: 'auetM8x6P5jy8Curah3NkqiMZQ.avif',
  },
  {
    id: '3',
    title: 'You Do',
    subtitle: 'INDEPENDENT PRACTICE',
    description:
      'Students take the lead to practising independently. This stage helps build confidence and shows what they\'ve mastered or where they need extra support.',
    image: 'u6InakIvapsvSo0yBI8cnUGKnLc.avif',
  },
];

export const lessonFeatures: LessonFeature[] = [
  {
    id: '1',
    title: "'Do Now' Starter Task",
    description:
      'We kick off each lesson with a quick task that brings past learning back to mind, helping students feel ready and confident to dive into something new.',
    image: '0GXX8Ix3WQpoeki2ozgusAXraSU.avif',
  },
  {
    id: '2',
    title: 'Intentional Lesson Planning',
    description:
      "Lessons aren't just delivered. They're carefully planned to help students internalise what they learn and build lasting mastery.",
    image: 'X5EKd69NxkDaFjYwR42ecTuzlc.avif',
  },
  {
    id: '3',
    title: "End-of-Lesson unit's Tasks",
    description:
      'Short, reflective activities at the end of each lesson help summarise key takeaways and deepen understanding through critical thinking.',
    image: 'mFtTDQiqSFvNt2uAoj4TAD5uf8.avif',
  },
];
