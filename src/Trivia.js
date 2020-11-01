import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import './index.css'


class Trivia extends Component {
    state = {
        score: 0,
        askedQuestions: [],
        turnCount: 0,
        data: [],
        remainingQuestions: [],
        clicked: false,
        currentQuestion: [],
        currentSelection: '',
        displayCorrect: false,
        displayScore: false,
        displayWin: false,
        roundCount: 0,
        currentAllQuestions: []
    }


    componentDidMount() {
        const data = require("./Apprentice_TandemFor400_Data.json");
        this.setState({
            data: data,
        })
    }



    rounds = async () => {
        this.setState({ displayCorrect: false })
        let remainingQuestions
        if (this.state.askedQuestions.length > 0) {
            remainingQuestions = this.state.data.filter(dataItem => {
                return !this.state.askedQuestions.includes(dataItem)
            })
        } else {
            remainingQuestions = this.state.data
        }
        this.setState({ remainingQuestions: remainingQuestions })
        if (this.state.turnCount < 10) {
            const currentQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]
            const currentAllQuestions = []
            if (currentQuestion) {
                let correctAnswer = `${currentQuestion.correct}--1`
                const answers = currentQuestion.incorrect.map(answer => {
                    const question = `${answer}--0`
                    return question
                })
                answers.push(correctAnswer)
                currentAllQuestions.push(answers)
            }
            if (currentQuestion) {
                await this.setState({
                    currentQuestion: currentQuestion,
                    currentAllQuestions: currentAllQuestions
                })

            }
            this.setState({ clicked: true })
        } else {
            this.setState({
                displayScore: true,
                displayWin: true,
                roundCount: this.state.roundCount + 1
            })
        }
    }

    handleChange = e => {
        this.setState({ currentSelection: parseInt(e.target.value) })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const score = parseInt(this.state.score)
        const round = parseInt(this.state.turnCount)
        const currentSelection = parseInt(this.state.currentSelection)
        const askedQuestions = this.state.askedQuestions
        askedQuestions.push(this.state.currentQuestion)
        await this.setState({
            score: isNaN(currentSelection) ? score : score + currentSelection,
            currentSelection: '',
            turnCount: round + 1,
            clicked: false,
            askedQuestions: askedQuestions,
            displayCorrect: true
        })
        return console.log(this.state)
    }



    render() {
        // debugger
        return (
            <>
                <header className='header'>
                    {
                        this.state.turnCount === 0 && !this.state.clicked && <>
                            <h1 style={{ fontWeight: '600', color: '##4a4948' }}>Ready to improve your trivia skills?</h1>
                            <Button style={{ marginTop: '1.7em', fontSize: '1em', color: '#9925cf', border: '2px solid #9925cf' }} color='secondary' onClick={this.rounds}>Get Started!</Button> </>
                    }
                    {this.state.displayCorrect && this.state.turnCount > 0 && this.state.turnCount <= 10 &&
                        <div className='answer'>
                            <h2 className="round-title">Correct Answer</h2>
                            <p className='correct-answer'>{this.state.currentQuestion.correct} was the correct answer</p>
                            <Button style={{color: '#f5ca1d', border: '1px #f5ca1d'}} onClick={() => { this.setState({ displayScore: !this.state.displayScore }) }}>See My Score</Button> <Button style={{ marginTop: '20px' }}  color='primary' onClick={() => { this.rounds() }}>Next Question</Button>
                            {this.state.displayScore &&
                                <div className='score'>
                                    <h4>My Score</h4>
                                    <p>{this.state.score}</p> </div>}

                        </div>}
                </header>

                <main className="main">
                    {this.state.clicked && <>

                        <h2 className="round-title">Question {this.state.turnCount + 1}</h2>
                        <h3 className='question'>{this.state.currentQuestion.question}</h3>
                        <FormControl variant="outlined">

                            <Select
                                native
                                value={this.state.currentSelect}
                                onChange={this.handleChange}
                                inputProps={{
                                    name: 'currentSelection',
                                    id: 'currentSelection',
                                }}
                            >

                            {this.state.currentAllQuestions && this.state.currentAllQuestions && this.state.currentAllQuestions[0].map((question, i) => {
                                return (
                                    <>
                                        <option value={question.split('--')[1]} key={i} >{question.split('--')[0]}</option>
                                    </>
                                )

                            })}
                            </Select>
                        </FormControl>
                        <footer>
                            <Button style={{ width: '17em', marginTop: '1.5em' }} variant='outlined' color='secondary' onClick={this.handleSubmit}>Submit</Button>
                        </footer>
                    </>
                    }

                </main>

                {this.state.displayWin && <>
                    <div className="completed">
                        <h1 className='round-title congrats'>Congratulations!</h1>
                        <h2>You have completed round {this.state.roundCount}</h2>
                        <h3>Your final score is {this.state.score}</h3>
                    </div>
                </>}

            </>
        )

    }

}

export default Trivia  