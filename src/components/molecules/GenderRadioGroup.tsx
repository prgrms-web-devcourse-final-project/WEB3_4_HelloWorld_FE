interface GenderRadioGroupProps {
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
}

const GenderRadioGroup = ({
  selectedGender,
  setSelectedGender,
}: GenderRadioGroupProps) => (
  <fieldset className="flex flex-col items-start mb-6">
    <legend className="text-base font-medium mb-1">
      성별 <span className="text-main">*</span>
    </legend>

    <div className="flex gap-4">
      {['남성', '여성'].map((gender) => (
        <div key={gender} className="flex items-center gap-1">
          <input
            checked={selectedGender === gender}
            className="cursor-pointer"
            id={`gender-${gender}`}
            name="gender"
            type="radio"
            value={gender}
            onChange={() => setSelectedGender(gender)}
          />
          <label className="cursor-pointer" htmlFor={`gender-${gender}`}>
            {gender}
          </label>
        </div>
      ))}
    </div>
  </fieldset>
);

export default GenderRadioGroup;
