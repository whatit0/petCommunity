import {useEffect, useMemo, useRef, useState} from "react";
import "./FrameComponet.css"

const FrameComponent = ({
                            prop,
                            arrowDown2,
                            onSelect,
                            options,
                        }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState("카테고리를 선택해주세요.");
    const dropdownRef = useRef(null)

    const toggleDropdown = () => setShowDropdown((prev) => !prev);

    const handleSelectOption = (option) => {
        setSelectedOption(option);
        if(onSelect) onSelect(option);
        setShowDropdown(false);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <div className="frame-board1" ref={dropdownRef}>
            <div className="category-frame">
                <div className="div2">{prop}</div>
                <div className="search1" >
                    <div className="main-frame">
                        <div className="div3" onClick={toggleDropdown}>
                            {selectedOption}
                        </div>
                        {showDropdown && (
                            <div className="dropdown-content">
                                {options.map((option, index) => (
                                    <div key={index} className="dropdown-item"
                                         onClick={() => handleSelectOption(option)}>
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <img className="arrow-down-2-icon" alt="" src={arrowDown2}/>
                </div>
            </div>
        </div>
    );
};

export default FrameComponent;