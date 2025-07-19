import React  from "react"

interface SizeDropdownProps {
  setBoardSize: (size: number) => void;
}

const SizeDropdown: React.FC<SizeDropdownProps> = ({ setBoardSize }) => {
  const boardOptions = Array.from({ length: 13 }, (_, i) => i + 3);

    const handleSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSize = parseInt(e.target.value, 10);
        setBoardSize(newSize);
    };

   return (
    <div className="text mb-4 space-x-2">
     <label htmlFor="size">Board size</label>  
    <select name="size" onChange={(e) => handleSizeChange(e)} className='border-2 border-gray-700 rounded-md p-1'>
         {boardOptions.map(opt => (<option key={opt} value={opt}>{opt}</option>))}
    </select>
</div>
)
}

export default SizeDropdown