import React from "react";
import { connect } from "react-redux";

import Modal from "components/Modal";
import { addStep } from "actions/ticTacToeGame";

import "./StartGameModal.css";

const rootCls = "start-game-modal";

interface ModalProps {
  addStep: any;
}

interface ModalState {
  gameLength: number;
  isStartGameModalOpen: boolean;
}

class StartGameModal extends React.Component<any, any> {
  state: Readonly<ModalState> = {
    gameLength: 0,
    isStartGameModalOpen: true
  };

  handleClick = () => {
    const { addStep } = this.props;
    const { gameLength } = this.state;

    addStep({ gameLength });
    this.setState((prevState: any) => ({
      isStartGameModalOpen: !prevState.isStartGameModalOpen
    }));
  };

  handleChange = (event: any) => {
    this.setState({ gameLength: event.target.value - 1 });
  };

  render() {
    const { isStartGameModalOpen } = this.state;

    return (
      <Modal isModalOpen={isStartGameModalOpen}>
        <div className={`${rootCls}__description`}>
          Выберите количество ходов:
        </div>

        <div className={`${rootCls}__input-wrap`}>
          <input
            type="number"
            className={`${rootCls}__input`}
            onChange={this.handleChange}
          />
        </div>

        <div className={`${rootCls}__button-wrap`}>
          <button onClick={this.handleClick} className={`${rootCls}__button`}>
            Играть
          </button>
        </div>
      </Modal>
    );
  }
}

export default connect(null, { addStep })(StartGameModal);
