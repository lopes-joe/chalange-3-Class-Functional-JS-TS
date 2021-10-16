import { Component, useContext, useEffect, useRef, useState } from 'react';
import ReactModal from 'react-modal';

interface FormProps {
  children : any,
  isOpen : boolean,
  setIsOpen : ()=> void
}

function Modal(props : FormProps){
  const { isOpen, children, setIsOpen} = props
  const [modalStatus, setModalStatus] = useState(isOpen)
  
  /*function usePrevious(prev : FormProps) {
    const ref = useRef<FormProps>();
    useEffect(() => {
      ref.current = prev;
    },[props]);
    return ref.current;
  }*/

  useEffect(()=>{
    setModalStatus(isOpen)
    console.log('isOpen: ', isOpen)
    console.log('modalStatus: ', modalStatus)
    console.log(setIsOpen)
  },[props])
  
  //function componentDidUpdate(prevProps : FormProps) {
  //  if (prevProps.isOpen !== isOpen) {
  //    setModalStatus(isOpen)
  //  }
  //}
    
  //if(ref){
  //  componentDidUpdate(ref)
  //}
  
  return (
    <ReactModal
      shouldCloseOnOverlayClick={!false}
      onRequestClose={setIsOpen}
      isOpen={modalStatus}
      ariaHideApp={false}
      style={{
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          background: '#F0F0F5',
          color: '#000000',
          borderRadius: '8px',
          width: '736px',
          border: 'none',
        },
        overlay: {
          backgroundColor: '#121214e6',
        },
      }}
    >
      {children}
    </ReactModal>
  );
}

/*====================================================================*/

/*class Modal extends Component<FormProps, ComponentState> {
  constructor(props : FormProps) {
    super(props);

    const { isOpen } = this.props;
    this.state = {
      modalStatus: isOpen
    }
  }

  componentDidUpdate(prevProps : FormProps) {
    const { isOpen } = this.props;

    if (prevProps.isOpen !== isOpen) {
      console.log(this.props)
      this.setState({ modalStatus: isOpen })
    }
  }

  render() {
    const { children, setIsOpen } = this.props;
    const { modalStatus } = this.state;

    return (
      <ReactModal
        shouldCloseOnOverlayClick={!false}
        onRequestClose={setIsOpen}
        isOpen={modalStatus}
        ariaHideApp={false}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            background: '#F0F0F5',
            color: '#000000',
            borderRadius: '8px',
            width: '736px',
            border: 'none',
          },
          overlay: {
            backgroundColor: '#121214e6',
          },
        }}
      >
        {children}
      </ReactModal>
    );
  }
};*/

export default Modal;