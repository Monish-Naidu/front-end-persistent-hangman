import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user_guess: '',
            game_id: 0,
            guessed: '',
            known: '',
        }
        this.newGame = this.newGame.bind(this);
        this.updateGuess = this.updateGuess.bind(this);
        this.gameUpdate = this.gameUpdate.bind(this);
    }

    newGame() {
        fetch('http://127.0.0.1:5000/Game/', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            })
        })
            .then(response => response.json())
            .then(data => this.setState({game_id:data}));
    }

    gameUpdate() {
        fetch("http://127.0.0.1:5000/Game/" + this.state.game_id + "/" + this.state.user_guess ,{
          method: 'PUT',
          headers:{
              'Accept': 'application/json',
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
          })
        })
            .then(response => response.json())
            .then(data => this.setState({
                game_id: data[0],
                guessed: data[1],
                known: data[2], }));
    }

    

    updateGuess(event) {
        this.setState({user_guess:event.target.value})
    }

   render() {
       return (
           <div>
               <div>
                   Guess:
                   <input type="text" value={this.state.user_guess} onChange={this.updateGuess} />
                   <button onClick={this.gameUpdate}>
                       <span>Submit</span>
                   </button>
               </div>
               <button class="button"  onClick={this.newGame}>
               <span>New Game</span>
               </button>
               <div>
               <table class="table table-dark">
                   <thead>
                       <tr>
                       <th scope="col">Game ID#</th>
                       <th scope="col">Guessed Letters</th>
                       <th scope="col">Known Letters</th>
                       </tr>
                   </thead>
                   <tbody>
                       <tr>
                       <td>{this.state.game_id}</td>
                       <td>{this.state.guessed}</td>
                       <td>{this.state.known}</td>
                       </tr>
                   </tbody>
                   </table>
               </div>
           </div>
       );
   }
}
export default App;
