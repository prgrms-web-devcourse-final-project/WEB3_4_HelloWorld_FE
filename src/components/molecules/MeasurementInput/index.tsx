import InputField from '@/app/login/components/InputField';

const MeasurementInputs = () => (
  <div className="flex gap-[74px] ">
    <InputField
      label="키"
      name="height"
      placeholder="예: 170cm"
      required
      width="234px"
      height="40px"
      className="flex-1"
      containerMarginBottom="60px"
      labelInputGap="5px"
    />
    <InputField
      label="몸무게"
      name="weight"
      placeholder="예: 60kg"
      required
      width="141px"
      height="40px"
      className="flex-1"
      containerMarginBottom="60px"
      labelInputGap="5px"
    />
  </div>
);

export default MeasurementInputs;
