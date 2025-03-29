import InputField from '@/app/login/components/InputField';

const exercises = [
  { label: '스쿼트', name: 'squat' },
  { label: '데드리프트', name: 'deadlift' },
  { label: '벤치프레스', name: 'benchpress' },
];

const ExerciseInputs = () => (
  <div className="flex gap-4 mb-6">
    {exercises.map(({ label, name }) => (
      <InputField
        key={name}
        label={label}
        name={name}
        placeholder="KG"
        width="141px"
        height="40px"
        containerMarginBottom="60px"
        labelInputGap="5px"
      />
    ))}
  </div>
);

export default ExerciseInputs;
