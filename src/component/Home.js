import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import axios from "axios";

const baseURL = "https://printful.com/test-quiz.php?action=questions&quizId=141";
const GET_ANSWERS = "https://printful.com/test-quiz.php?action=answers&quizId=141&questionId=";

const Home = () => {
    const [name, setName] = useState(null);
    const [options, setOptions] = useState([]);
    const [answersList, setAnswersList] = useState([]);
    const [activeFieldSet, setActiveFieldSet] = useState(1);
    const [selectedQuestion, setSelectedQuestion] = useState(null);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        getQuestionsList();
    }, []);

    const getQuestionsList = () => {
        axios.get(baseURL).then((response) => {
            const selectOptions = response?.data?.map((obj) => {
                return {
                    label: obj?.title,
                    value: obj?.id
                }
            })
            setOptions(selectOptions);
            console.log(response.data);
        });
    }

    const getAnswer = (qId) => {
        axios.get(GET_ANSWERS + qId).then((response) => {
            console.log(response.data);
            setAnswersList(response.data)
        });
    }

    const changeFieldSet = (value) => {
        if (name && selectedQuestion){
            console.log('value', value)
            setActiveFieldSet(value);
        } else {
            alert('please fill the required fields')
        }
    }
    const onQuestionSelect = (value) => {
        console.log(value);
        setSelectedQuestion(value)
        getAnswer(value.value);

    }
    const ansHandler = (id) => {
        console.log(id)
        setSelectedId(id);
    }
    return (
        <>
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-11 col-sm-9 col-md-7 col-lg-6 col-xl-5 text-center p-0 mt-3 mb-2">
                        <div className="card px-0 pt-4 pb-0 mt-3 mb-3">
                            <h2 id="heading">Technical Task</h2>
                            <form id="msform">
                                {/*fieldsets*/}
                                {activeFieldSet == 1 &&
                                    <fieldset>
                                        <div className="form-card">
                                            <label className="fieldlabels">Name: *</label>
                                            <input type="text" placeholder="Enter your name" value={name} onChange={(e)=> setName(e.target.value)}required/>
                                            <label className="fieldlabels">Choose Test: *</label>
                                            <Select options={options} value={options.title} onChange={onQuestionSelect} />
                                        </div>
                                        <input type="button" name="next" className="next action-button" value="Next" onClick={()=> changeFieldSet(2)}/>
                                    </fieldset>
                                }
                                {activeFieldSet == 2 &&
                                    <fieldset>
                                        <div className="form-card">
                                            <div className="row">
                                                    <h2 className="fs-title">{selectedQuestion.label}</h2>
                                            </div>
                                            <div className="row">
                                                {
                                                    answersList.map((elem)=> {
                                                        return (
                                                            <div className="col-12 col-md-6 col-lg-6">
                                                                <button type="button" className={selectedId == elem.id? 'selectedClass' : 'normalClass'} onClick={() => ansHandler(elem.id)}>{elem.title}</button>
                                                            </div>
                                                        )
                                                    })
                                                }
                                            </div>
                                        </div>
                                        <input type="button" name="next" className="next action-button" value="Next" onClick={()=> selectedId ? changeFieldSet(3) : alert ('please select your answer')}/>
                                        <input type="button" name="previous" className="previous action-button-previous"
                                               value="Previous" onClick={()=> changeFieldSet(1)}/>
                                    </fieldset>
                                }
                                {activeFieldSet == 3 &&
                                    <fieldset>
                                        <div className="form-card">
                                            <div className="row">
                                                <div className="col-7">
                                                    <h2 className="fs-title">Finish:</h2>
                                                </div>
                                                <div className="col-5"><h2 className="steps">Step 3 - 3</h2>
                                                </div>
                                            </div>
                                            <br /><br />
                                            <h2 className="purple-text text-center"><strong>Thanks, {name}!</strong></h2>
                                            <br/>
                                            <div className="row justify-content-center">
                                                <div className="col-3">
                                                    <img src="https://i.imgur.com/GwStPmg.png" className="fit-image" />
                                                </div>
                                            </div>
                                            <br /><br />
                                            <div className="row justify-content-center">
                                                <div className="col-7 text-center">
                                                    <h5 className="purple-text text-center">You responded
                                                        correctly to 3 out of 4 questions.</h5>
                                                </div>
                                            </div>
                                        </div>
                                    </fieldset>
                                }

                                {/* progressbar */}
                                {/*<ul id="progressbar">
                                    <li className="active" id="account"><strong>Account</strong></li>
                                    <li id="personal"><strong>Personal</strong></li>
                                    <li id="payment"><strong>Image</strong></li>
                                    <li id="confirm"><strong>Finish</strong></li>
                                </ul>*/}
                                <div className="progress">
                                    <div className="progress-bar progress-bar-striped progress-bar-animated"
                                         role="progressbar" aria-valuemin="0" aria-valuemax="100" />
                                </div>
                                <br/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;