import './landing.css'
import './assests/inter.css'
import './assests/fontawesome.css'

function Landing (){
    return(
        <>
            <div className='main'>
            <div className="hader">
                <h1>MacroMate</h1>
            </div>
            <div className="textWrapper">
                <h1 className='slogan'><i>Eat Smart Without the Math</i></h1>
                <p className='subHeader'>
                Effortlessly track your calories, 
                stay on top of your nutrition goals, 
                and build healthier habits—one meal at a time.
                </p>
            </div>
            <button className='button'type="button">Get started <i className="fa-solid fa-arrow-right"></i></button>
            </div>
        </>
    )
}

export default Landing