const GenderRadioGroup = ({
  selectedGender,
  setSelectedGender,
}: GenderRadioGroupProps) => (
  <div className="flex flex-col items-start mb-6">
    <label className="text-base font-medium mb-1">
      성별 <span className="text-main">*</span>
    </label>
    <div className="flex gap-4">
      {['남성', '여성'].map((gender) => (
        <label key={gender} className="flex items-center gap-1 cursor-pointer">
          <input
            type="radio"
            name="gender"
            value={gender}
            checked={selectedGender === gender}
            onChange={() => setSelectedGender(gender)}
          />
          <span>{gender}</span>
        </label>
      ))}
    </div>
  </div>
);

export default GenderRadioGroup;
