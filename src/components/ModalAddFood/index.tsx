import { Component, createRef, useEffect } from 'react';
import { FiCheckSquare } from 'react-icons/fi';
import { Form } from './styles';
import Modal from '../Modal';
import Input from '../Input';
import { FormHandles } from '@unform/core';

interface FoodType {
  id: string,
  name: string,
  image : string,
  description: string,
  price: number,
  available : boolean
}
interface ModalAddFood {
  setIsOpen : ()=> void, 
  handleAddFood : ({} : FoodType)=> void,
  isOpen : boolean,
  //formRef : React.Ref<FormHandles>, 
}

function ModalAddFood(props : ModalAddFood){
  const formRef = createRef<FormHandles>();
  const { isOpen, setIsOpen, handleAddFood } = props;

  const handleSubmit = async (data : FoodType) => {
    handleAddFood(data);
    /*setIsOpen();*/
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <h1>Novo Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="add-food-button">
          <p className="text">Adicionar Prato</p>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
/*====================================================================*/
/*class ModalAddFood extends Component<any, ModalAddFood> {
  constructor(props : ModalAddFood) {
    super(props);
    this.formRef = createRef<FormHandles>();
  }
  handleSubmit = async (data : FoodType) => {
    const { setIsOpen, handleAddFood } = this.props;
    handleAddFood(data);
    setIsOpen();
  };
  render() {
    const { isOpen, setIsOpen } = this.props;
    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={this.formRef} onSubmit={this.handleSubmit}>
          <h1>Novo Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />
          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />
          <Input name="description" placeholder="Descrição" />
          <button type="submit" data-testid="add-food-button">
            <p className="text">Adicionar Prato</p>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
};*/
export default ModalAddFood;