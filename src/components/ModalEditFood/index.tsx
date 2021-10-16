import { Component, createRef } from 'react';
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
interface ModalEditFood {
  setIsOpen : ()=> void, 
  handleUpdateFood : (food: FoodType) => Promise<void>,
  isOpen : boolean, 
  editingFood : {id : string},
  //formRef : React.Ref<FormHandles> | undefined,
}
interface FoodType {
  id: string,
  name: string,
  image : string,
  description: string,
  price: number,
  available : boolean
}

function ModalEditFood(props : ModalEditFood){
  const formRef = createRef<FormHandles>()
  const { isOpen, setIsOpen, editingFood, handleUpdateFood } = props;
  const handleSubmit = async (data : FoodType) => {  
    handleUpdateFood(data);
    //setIsOpen()
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />
        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />
        <Input name="description" placeholder="Descrição" />
        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );

} 
/*================================================================ */


/*class ModalEditFood extends Component<any, ModalEditFood>{
  constructor(props : ModalEditFood) {
    super(props);
    this.formRef = createRef()
  }

  handleSubmit = async (data : any) => {
    const { setIsOpen, handleUpdateFood } = this.props;
    handleUpdateFood(data);
    setIsOpen();
  };

  render() {
    const { isOpen, setIsOpen, editingFood } = this.props;

    return (
      <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
        <Form ref={this.formRef} onSubmit={this.handleSubmit} initialData={editingFood}>
          <h1>Editar Prato</h1>
          <Input name="image" placeholder="Cole o link aqui" />

          <Input name="name" placeholder="Ex: Moda Italiana" />
          <Input name="price" placeholder="Ex: 19.90" />

          <Input name="description" placeholder="Descrição" />

          <button type="submit" data-testid="edit-food-button">
            <div className="text">Editar Prato</div>
            <div className="icon">
              <FiCheckSquare size={24} />
            </div>
          </button>
        </Form>
      </Modal>
    );
  }
};*/
export default ModalEditFood;