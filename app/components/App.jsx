
import AltContainer from 'alt-container';
import React from 'react';
import Lanes from './Lanes.jsx';
import LaneActions from '../actions/LaneActions';
import LaneStore from '../stores/LaneStore';

import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

@DragDropContext(HTML5Backend)
export default class App extends React.Component {

  render() {
      return (
          <div>
            <button className="add-lane" onClick={this.addLane}>添加Lane</button>
            <AltContainer stores={[LaneStore]}
                          inject={{
                              lanes: () => LaneStore.getState().lanes || []
                          }} >
                  <Lanes />
            </AltContainer>
          </div>
      );
  }

  /*** 怎么实现的自动绑定？ ***/
  addLane () {
    LaneActions.create({name: '新的Lane'});
  }

}
