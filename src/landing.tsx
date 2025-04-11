import './landing.css'
import './font/inter.css'

function Landing (){
    return(
        <>
            <div>

            <div className="textWrapper">
                <h1 className='slogan'><i>Eat Smart Without the Math</i></h1>
                <p className='subHeader'>
                Effortlessly track your calories, 
                stay on top of your nutrition goals, 
                and build healthier habits—one meal at a time.
                </p>
            </div>
            <button type="button">Get started</button>
            </div>
        </>
    )
}

export default Landing