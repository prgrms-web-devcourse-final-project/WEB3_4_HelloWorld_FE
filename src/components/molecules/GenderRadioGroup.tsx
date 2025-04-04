interface GenderRadioGroupProps {
  selectedGender: string;
  setSelectedGender: (gender: string) => void;
}

const GenderRadioGroup = ({
  selectedGender,
  setSelectedGender,
}: GenderRadioGroupProps) => (
  <div className="flex flex-col items-start mb-6">
    <label className="text-base font-medium mb-1" htmlFor="gender-group">
      성별 <span className="text-main">*</span>
    </label>
    <div className="flex gap-4" id="gender-group">
      {['남성', '여성'].map((gender) => (
        <label key={gender} className="flex items-center gap-1 cursor-pointer">
          <input
            checked={selectedGender === gender}
            id={`gender-${gender}`}
            name="gender"
            type="radio"
            value={gender}
            onChange={() => setSelectedGender(gender)}
          />
          <span>{gender}</span>
        </label>
      ))}
    </div>
  </div>
);

export default GenderRadioGroup;
