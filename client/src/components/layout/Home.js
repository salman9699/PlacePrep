import React, { useState } from "react";
import Navbar from "./Navbar";
import "./styles.css";
import SideBar from "../sidebar/SideBar";
import UserProfile from "../auth/UserProfile";
import CreateQuiz from "../quiz/CreateQuiz";
import Coding from "../coding/Coding";
import CodeQuestions from "../code/CodeQuestions";
import CreateCodeQuestion from "../code/CreateCodeQues";
import QuizPage from "../quiz/QuizPage";
import QuizPageSub from '../quiz/quizSubmission/QuizPageSub';
import QuizCardPage from '../quiz/QuizCardPage';
import EditQuiz from '../quiz/EditQuiz';
import QuizSubmissions from '../quiz/quizSubmission/QuizSubmissions';
import PracticeProblem from '../practiceProblems/PracticeProblem';
import PracticeQuizPage from '../practiceProblems/PracticeQuizPage';
import AddTopics from '../practiceProblems/AddTopics';
import EditPracticeProblem from '../practiceProblems/EditPracticeProblem';
import { Route, Switch } from "react-router-dom";

const Home = () => {
    const [sidebarOpen, setSidebarOpen] = useState(true);

    const toggleSidebarBtn = () => {
        setSidebarOpen(!sidebarOpen);
    };

    return (
        <>
            <Navbar onClick={() => toggleSidebarBtn()} />
            <div style={{ display: "flex", height: "100vh" }}>
                <SideBar sidebarOpen={sidebarOpen} onClick={() => toggleSidebarBtn()} />
                <div className={"mainview-container " + (!sidebarOpen && 'remove-margin')}>
                    <Switch>
                        <Route path="/me" component={UserProfile} />
                        <Route path="/createQuiz" component={CreateQuiz} />
                        <Route path="/code/:id" component={Coding} />
                        <Route path="/codeQuestions" component={CodeQuestions} />
                        <Route path="/createCodeQuestion" component={CreateCodeQuestion} />
                        <Route path="/editCodeQuestion/:id" component={CreateCodeQuestion} />
                        <Route path="/quizzes" component={QuizCardPage} />
                        {/* <Route path="/quiz" component={QuizPage} /> */}
                        <Route exact path="/editQuiz/:slug" component={EditQuiz} />
                        <Route exact path="/quiz/:slug" component={QuizPage} />
                        <Route exact path="/quizSubmissions" component={QuizSubmissions} />
                        <Route exact path="/quizSubmissions/:quizId" component={QuizSubmissions} />
                        <Route exact path="/quizSubmission/:id" component={QuizPageSub} />
                        <Route exact path="/practiceProblems" component={PracticeProblem} />
                        <Route exact path="/editpracticeProblem/:id" component={EditPracticeProblem} />
                        <Route exact path="/practiceProblems/:categorySlug/:topicSlug" component={PracticeQuizPage} />
                        <Route exact path="/addTopic" component={AddTopics} />
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default Home;