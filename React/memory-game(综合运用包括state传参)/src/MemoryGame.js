import React, {Component} from 'react';
import shuffle from 'shuffle-array';
import Navbar from './Navbar';
import Card from './Card';


// A card can be in 1 of 3 CardStates
// HIDING - the card is not being shown
// SHOWING - the card is being shown but does not have a match yet
// MATCHING - the card is being shown and has a match.
//            the card should never move from MATCHING to another state during
//            game play.
//设置成三种情况
const CardState = {
  HIDING:0,
  SHOWING:1,
  MATCHING:2

}


export default class MemoryGame extends Component {
constructor(props){
  super(props);
  let cards = [
    {id: 0, cardState: CardState.HIDING, backgroundColor: 'red'},
    {id: 1, cardState: CardState.HIDING, backgroundColor: 'red'},
    {id: 2, cardState: CardState.HIDING, backgroundColor: 'navy'},
    {id: 3, cardState: CardState.HIDING, backgroundColor: 'navy'},
    {id: 4, cardState: CardState.HIDING, backgroundColor: 'green'},
    {id: 5, cardState: CardState.HIDING, backgroundColor: 'green'},
    {id: 6, cardState: CardState.HIDING, backgroundColor: 'yellow'},
    {id: 7, cardState: CardState.HIDING, backgroundColor: 'yellow'},
    {id: 8, cardState: CardState.HIDING, backgroundColor: 'black'},
    {id: 9, cardState: CardState.HIDING, backgroundColor: 'black'},
    {id: 10, cardState: CardState.HIDING, backgroundColor: 'purple'},
    {id: 11, cardState: CardState.HIDING, backgroundColor: 'purple'},
    {id: 12, cardState: CardState.HIDING, backgroundColor: 'pink'},
    {id: 13, cardState: CardState.HIDING, backgroundColor: 'pink'},
    {id: 14, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'},
    {id: 15, cardState: CardState.HIDING, backgroundColor: 'lightskyblue'}
  ];
  cards = shuffle(cards);
  // 因为cards的颜色会变动 所以设置成state
  this.state = {cards:cards, noClick: false};
  
  this.handleClick = this.handleClick.bind(this);
  this.handleNewGame = this.handleNewGame.bind(this);

}
handleNewGame(){
//将所有的cardState设置成hiding
  let cards = this.state.cards.map((c) => ({
...c,
cardState:CardState.HIDING
  }));
  cards = shuffle(cards);
  this.setState({cards});
}

handleClick(id){
  // 先写一个更新函数
  const mapCardState = (cards, idsToChange, newCardState) => {
    return cards.map( c => {
      //注意此处是includes，而不是include
      if (idsToChange.includes(c.id)){
        return {
          ...c,
          cardState: newCardState
        };
      }
      return c;
    })
  }
//找到被点击的卡牌
 const foundCard = this.state.cards.find(c => c.id === id);

 //排除点击已经match 已经showing的和牌不match 翻转期间内的情况
 if (this.state.noClick || foundCard.cardState !== CardState.HIDING){
   return;
 }
 //设置同名变量
 let noClick = false;
 //更新牌的状态，先翻转点击的牌
 let cards = mapCardState(this.state.cards, [id], CardState.SHOWING);

 const showingCards = cards.filter((c) => c.cardState === CardState.SHOWING);
 const ids = showingCards.map( c => c.id);
// 判断是否需要翻转的各种情况
//如果颜色相同
 if (showingCards.length === 2 &&
     showingCards[0].backgroundColor === showingCards[1].backgroundColor){
       cards = mapCardState(cards, ids, CardState.MATCHING);
       //如果颜色不同
     } else if (showingCards.length === 2){
       let hidingCards = mapCardState(cards, ids, CardState.HIDING);
       noClick = true;
      // 先把点击的牌反过来 并设置点击无效 然后1.3秒之后再翻转，并且设置点击有效
       this.setState({cards, noClick}, () => {
         setTimeout(() => {
           this.setState({cards:hidingCards, noClick:false});
         }, 1300);
       });
       return;
     }
     this.setState({cards, noClick});
}
render (){
const cards = this.state.cards.map((card) => (

  <Card 
    key={card.id}
    showing={card.cardState !== CardState.HIDING}
    backgroundColor={card.backgroundColor}
    onClick={() => this.handleClick(card.id)}
    />
));

return (
  <div>
    <Navbar onNewGame={this.handleNewGame} />
    {cards}
  </div>
);
}


}
