import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ChessField extends Component {

    render() { 
        return ( 
            <Modal isOpen={this.props.isOpen}>
                <ModalHeader>{this.props.title}</ModalHeader>
                <ModalBody>
                    { this.props.children }
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={this.props.onCancel}>No</Button>
                    <Button color="secondary" onClick={this.props.onYes}>Yes</Button>
                </ModalFooter>
            </Modal>
        );
    }
}
 

export default ChessField;