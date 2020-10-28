import React, { Component } from 'react'
import Button from '@material-ui/core/Button';


class Trivia extends Component {
    state = {
        score: 0,
        askedQuestions: [],
        roundCount: 0,
        data: [],
        remainingQuestions: [],
        clicked: false,
        currentQuestion: [],
        currentSelection: '',
        displayCorrect: false,
        displayScore: false
    }


    componentDidMount() {
        const data = require("./Apprentice_TandemFor400_Data.json");
        this.setState({ data: data })
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
        if (this.state.roundCount <= 10 ) {
            // const currentQuestion = remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]
            await this.setState({
                currentQuestion: remainingQuestions[Math.floor(Math.random() * remainingQuestions.length)]
            })
            this.setState({ clicked: true })

        }
    }

    handleChange = e => {
        this.setState({ currentSelection: parseInt(e.target.value) })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const score = parseInt(this.state.score)
        const round = parseInt(this.state.roundCount)
        const currentSelection = parseInt(this.state.currentSelection)
        const askedQuestions = this.state.askedQuestions
        askedQuestions.push(this.state.currentQuestion)
        await this.setState({
            score: isNaN(currentSelection) ? score : score + currentSelection,
            currentSelection: '',
            roundCount: round + 1,
            clicked: false,
            askedQuestions: askedQuestions,
            displayCorrect: true
        })
        return console.log(this.state)
    }



    render() {
        return (
            <>
                <header className='header'>
                    {
                        this.state.roundCount === 0 && !this.state.clicked && <>
                            <h1>Ready to Improve your Trivia Skills?</h1>
                            <Button variant='contained' color='primary' onClick={this.rounds}>Get Started!</Button> </>
                    }
                    {this.state.displayCorrect && this.state.roundCount > 0 && this.state.roundCount <= 10 &&
                        <>
                            <p>{this.state.currentQuestion.correct} was the correct answer</p>
                            <Button variant='contained' onClick={() => { this.setState({ displayScore: !this.state.displayScore }) }}>See My Score</Button> <Button style={{ marginTop: '20px' }} variant='contained' onClick={() => { this.rounds() }}>Next Question</Button>
                            {this.state.displayScore &&
                                <div className='score'>
                                    <h4>My Score</h4>
                                    <p>{this.state.score}</p> </div>}

                        </>}
                </header>

                <main className="main">
                    {this.state.clicked && <>
                        <h3>{this.state.currentQuestion.question}</h3>
                        <form>
                            <select id='currentSelection' onChange={this.handleChange}>


                                {this.state.currentQuestion.incorrect.map((incorrect, i) => {

                                    return <option value='0' key={i} >{incorrect}</option>

                                })}
                                <option value='1'>{this.state.currentQuestion.correct}</option>
                            </select>
                        </form>
                        <footer>
                            <Button variant='contained' color='secondary' onClick={this.handleSubmit}>Submit</Button>
                        </footer>
                    </>
                    }

                </main>


            </>
        )

    }

}

export default Trivia  