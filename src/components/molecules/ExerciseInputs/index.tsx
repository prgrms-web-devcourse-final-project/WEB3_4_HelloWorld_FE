import InputField from '@/app/login/components/InputField';

const exercises = [
  { label: '스쿼트', name: 'recentSquat' },
  { label: '데드리프트', name: 'recentDeadlift' },
  { label: '벤치프레스', name: 'recentBench' },
];

interface ExerciseInputsProps {
  setExerciseData: React.Dispatch<
    React.SetStateAction<{
      recentBench: number;
      recentSquat: number;
      recentDeadlift: number;
    }>
  >;
}

const ExerciseInputs = ({ setExerciseData }: ExerciseInputsProps) => (
  <div className="flex gap-4 mb-6">
    {exercises.map(({ label, name }) => (
      <InputField
        key={name}
        containerMarginBottom="60px"
        height="40px"
        label={label}
        labelInputGap="5px"
        name={name}
        placeholder="KG"
        type="number"
        width="141px"
        onChange={(e) => {
          const value = Number(e.target.value); // 숫자로 변환

          setExerciseData((prev) => ({
            ...prev,
            [name]: value,
          }));
        }}
      />
    ))}
  </div>
);

export default ExerciseInputs;
