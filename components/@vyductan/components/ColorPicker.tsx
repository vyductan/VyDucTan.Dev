type ColorPickerProps = {
  color: string;
  disable?: boolean;
  onChange: () => void;
};
const ColorPicker = ({ color, disable, onChange }: ColorPickerProps) => {
  return (
    <div className="w-[100px] p-1.5 bg-white rounded-sm border cursor-pointer">
      <div className="rounded-sm py-2" style={{ backgroundColor: color }}></div>
    </div>
  );
};

export default ColorPicker;
