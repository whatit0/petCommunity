import {useEffect, useMemo, useRef, useState} from "react";
import styles from "./category.module.css";

const Category = ({ prop, arrowDown2, onSelect, options }) => {
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedOption, setSelectedOption] = useState("카테고리를 선택해주세요.");
    const dropdownRef = useRef(null);

    const toggleDropdown = () => setShowDropdown(prev => !prev);

    const handleSelectOption = option => {
        setSelectedOption(option);
        if (onSelect) onSelect(option);
        setShowDropdown(false);
    };

    useEffect(() => {
        const handleClickOutside = event => {
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
        <div className={styles["frame-board1"]} ref={dropdownRef}>
            <div className={styles["category-frame"]}>
                <div className={styles.div2}>{prop}</div>
                <div className={styles.search1}>
                    <div className={styles["main-frame"]}>
                        <div className={styles.div3} onClick={toggleDropdown}>
                            {selectedOption}
                        </div>
                        {showDropdown && (
                            <div className={styles["dropdown-content"]}>
                                {options.map((option, index) => (
                                    <div key={index} className={styles["dropdown-item"]}
                                         onClick={() => handleSelectOption(option)}>
                                        {option}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <img className={styles["arrow-down-2-icon"]} alt="" src={arrowDown2} />
                </div>
            </div>
        </div>
    );
};

export default Category;