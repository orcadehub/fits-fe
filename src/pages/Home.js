import React from "react";
import "./Home.css";
import Graph1 from "../components/Graph1";
import Graph2 from "../components/Graph2";
import Graph3 from "../components/Graph3";

const Home = () => {
  return (
    <div>
      <div>
        <h1>What is Seizure's?</h1>
        <p>
          Uncontrolled jerking, loss of consciousness, blank stares, or other
          symptoms caused by abnormal electrical activity in the brain.
        </p>
      </div>

      <div>
        <h1>Seizure Ranges in the Brain</h1>
        <p>
          The brain's electrical activity during seizures can be grouped into
          three ranges: High, Medium, and Low.
        </p>

        <div className="box1">
          <div className="content">
            <h3>High Seizure Range (HSR) Definition</h3>
            <p>
              The High Seizure Range (HSR) refers to a specific frequency range
              of brain activity, typically between 80-120 Hz, that is often
              associated with seizure activity.
            </p>
            <h5>Characteristics of HSR</h5>
            <p>1. Frequency: HSR is characterized by high-frequency oscillations (HFOs) in the brain, typically within the 80-120 Hz range.</p>
            <p>2. Amplitude: HSR is often associated with high-amplitude brain activity.</p>
            <p>3. Duration: HSR can last from a few seconds to several minutes.</p>
            <h5>Clinical Significance of HSR</h5>
            <p>1. Seizure prediction: HSR can be used as a biomarker to predict seizure onset.</p>
            <p>2. Seizure diagnosis: HSR can aid in the diagnosis of epilepsy and seizure disorders.</p>
            <p>3. Treatment monitoring: HSR can be used to monitor the effectiveness of seizure treatments.</p>
          </div>
          <div className="graph">
            <Graph1 />
          </div>
        </div>

        <div className="box1">
          <div className="content">
            <h3>Middle Range Seizures (MRS) or Medium-Voltage Seizures</h3>
            <p>
              Middle Range Seizures (MRS) are a type of seizure characterized by
              a specific frequency range of brain activity, typically between
              20-50 Hz.
            </p>
            <h5>Characteristics of MRS</h5>
            <p>
              1. Frequency: MRS are associated with medium-frequency
              oscillations (MFOs) in the brain, typically within the 20-50 Hz
              range.
            </p>
            <p>
              2. Amplitude: MRS are often characterized by moderate-amplitude
              brain activity.
            </p>
            <p>
              3. Duration: MRS can last from a few seconds to several minutes.
            </p>
          </div>
          <div className="graph">
            <Graph2 />
          </div>
        </div>

        <div className="box1">
          <div className="content">
            <h3>Low-Range Seizures (LRS) or Low-Voltage Seizures</h3>
            <p>
              Low-Range Seizures (LRS) are a type of seizure characterized by a
              specific frequency range of brain activity, typically below 10 Hz.
            </p>
            <h5>Characteristics of LRS</h5>
            <p>
              1. Frequency: LRS are associated with low-frequency oscillations
              (LFOs) in the brain, typically below 10 Hz.
            </p>
            <p>
              2. Amplitude: LRS are often characterized by low-amplitude brain
              activity.
            </p>
            <p>
              3. Duration: LRS can last from a few seconds to several minutes.
            </p>
          </div>
          <div className="graph">
            <Graph3 />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
