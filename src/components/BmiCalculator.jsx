import { useState } from 'react';
import style from '../styles/BmiCalc.module.css'
import PrettoSlider from './PrettoSlider';
import Button from '@mui/material/Button';
import NavSideBar from './NavSideBar';
let BmiCalculator = () => {

  const [weight,setWeight] = useState(35)
  const [feet,setFeet] = useState(5)
  const [inch,setInch] = useState(0)
  const [bmi,setBmi] = useState('')
  const [message,setMessage] = useState('')

  let CalculateBMI = () => {
    let mtr = ((feet * 12) + inch) * 0.0254;
    let bmiValue = weight / (mtr * mtr)
    setBmi(bmiValue.toFixed(2));

    let minHealthyWeight = 18.5 * (mtr * mtr);
    let maxHealthyWeight = 24.9 * (mtr * mtr);

    if (bmiValue < 18.5) {
      setMessage(`You are underweight. Gain at least ${(minHealthyWeight - weight).toFixed(1)} kg to reach a healthy BMI.`);
    } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
      setMessage("You are in a healthy BMI range. Keep maintaining your weight!");
    } else {
      setMessage(`You are overweight. Lose at least ${(weight - maxHealthyWeight).toFixed(1)} kg to reach a healthy BMI.`);
    }
  }

  return (
    <>
        <main className={style.BmiCalculator}>
            <section className={style.calculator}>
                <div className={style.bmiTitle}>
                  BMI CALCULATOR
                </div>
                
                <div className={style.measurements}>
                  <h3 className={style.measureTitle}>
                    <h3>
                      Weight (kg)
                    </h3>
                    <h3>
                      {weight} Kg
                    </h3>
                  </h3>
                  <PrettoSlider
                    value={weight}
                    defaultValue={5}
                    step={0.1}
                    min={30}
                    max={120}
                    valueLabelDisplay="auto"
                    onChange={(e)=>setWeight(e.target.value)}
                  />


                  <h3 className={style.measureTitle}>
                    <h3>
                      Height (Ft)
                    </h3>
                    <h3>
                      {feet} Ft
                    </h3>
                  </h3>
                  <PrettoSlider
                  value={feet}
                    defaultValue={5}
                    step={1}
                    marks
                    min={1}
                    max={7}
                    valueLabelDisplay="auto"
                    onChange={(e)=>setFeet(e.target.value)}
                  />

                  <h3 className={style.measureTitle}>
                    <h3>
                      Height (Inch)
                    </h3>
                    <h3>
                      {inch} In
                    </h3>
                  </h3>
                  <PrettoSlider
                  value={inch}
                    defaultValue={5}
                    step={1}
                    marks
                    min={0}
                    max={11}
                    valueLabelDisplay="auto"
                    onChange={(e)=>setInch(e.target.value)}
                  />
                </div>
                <Button variant="contained" color='error' onClick={CalculateBMI} className='btnFonts'>Calculate BMI</Button>
                <h1>{bmi}</h1>
                <h3>{message}</h3>
            </section>
            {/* Section for bmi information */}
            <section className={style.bmi_info}>
                <h2> Reference Scale</h2>
                <img src="/images/bmireference.png" alt="bmi-image" width="500px"/>
                <div className={style.BmiIntro}>
                  <h2>
                    BMI Introduction    
                  </h2>
                  <h3>What is BMI?</h3>
                  <p>Body Mass Index (BMI) is a value derived from the mass (weight)
                    mass (height) of a person. The BMI is defined as the body mass divided by the
                    square of the body height, and is universally expressed in units of kg/m2
                    where kg is mass in kilograms and m2 is body height squared in meters.</p>
                  <p>
                    BMI is a measurement of a person&apos;s leanness or corpulence based on their height and weight, and is intended to quantify tissue mass. It is widely used as a general indicator of whether a person has a healthy body weight for their height. Specifically, the value obtained from the calculation of BMI is used to categorize whether a person is underweight, normal weight, overweight, or obese depending on what range the value falls between. These ranges of BMI vary based on factors such as region and age, and are sometimes further divided into subcategories such as severely underweight or very severely obese. Being overweight or underweight can have significant health effects, so while BMI is an imperfect measure of healthy body weight, it is a useful indicator of whether any additional testing or action is required. Refer to the table below to see the different categories based on BMI that are used by the calculator.
                  </p>
                </div>
                <div className={style.BmiTables}>
                  <h3>
                    BMI table for adults
                  </h3>
                  <p>
                    This is the World Health Organization (WHO) recommended body weight based on BMI values for adults. It is used for both men and women, age 20 or older.
                  </p>
                  <table border='1' className={style.bmi_table}>
                    <tr>
                      <th>Classification</th>
                      <th>BMI range - kg/m2</th>
                    </tr>
                    <tr>
                      <td> Severe Thinness </td>
                      <td> Less Than 16 </td>
                    </tr>
                    <tr>
                      <td> Moderate Thinness </td>
                      <td> 16 - 17 </td>
                    </tr>
                    <tr>
                      <td> Mild Thinness </td>
                      <td> 17 - 18.5 </td>
                    </tr>
                    <tr>
                      <td> Normal weight </td>
                      <td> 18.5 - 24.9 </td>
                    </tr>
                    <tr>
                      <td> Overweight </td>
                      <td> 25 - 29.9 </td>
                    </tr>
                    <tr>
                      <td> Obesity Class 1 </td>
                      <td> 30 - 34.9 </td>
                    </tr>
                    <tr>
                      <td> Obesity Class 2 </td>
                      <td> 35 - 39.9 </td>
                    </tr>
                    <tr>
                      <td> Obesity Class 3 </td>
                      <td> 40 or Heigher </td>
                    </tr>
                  </table>
                  {/* <h3>
                    BMI table for children and teens , age 2 - 20
                  </h3>
                  <p>
                    The Centers for Disease Control and Prevention (CDC) recommends BMI categorization for children and teens between age 2 and 20.
                  </p>
                  <table border='1' className={style.bmi_table}>
                    <tr>
                      <th> Classification </th>
                      <th> BMI Percentile </th>                  
                    </tr>
                    <tr>
                      <td> Under weight </td>
                      <td> Less Than 5% </td>
                    </tr>
                    <tr>
                      <td> Healthy Weight </td>
                      <td> 5% - 84% </td>
                    </tr>
                    <tr>
                      <td> At risk of overweight </td>
                      <td> 85% - 94% </td>
                    </tr>
                    <tr>
                      <td> Overweight </td>
                      <td> 95% or above </td>
                    </tr>
                  </table> */}
                </div>


            </section>
            <section>
              <NavSideBar/>
            </section>
        </main>
    </>
  )
}

export default BmiCalculator;