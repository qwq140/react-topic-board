import PropTypes from "prop-types";


const CustomButton = ({onClick, children, className = 'bg-blue-500 text-white hover:bg-blue-600'}) => {

    return (
        <button
            onClick={onClick}
            className={`px-4 py-2 rounded-lg shadow-sm ${className}`}
        >
            {children}
        </button>
    );

}

CustomButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
}

export default CustomButton;