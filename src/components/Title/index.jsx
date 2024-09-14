import "./Title.css" 
import logo from '../../assets/WolLogo1.webp';

const Title = () => {
    return (
        <div className="title">
            <img className="logo_img" src={logo} alt="logo" />
            <h1>Owl Focus</h1>
        </div>
    )
}

export default Title