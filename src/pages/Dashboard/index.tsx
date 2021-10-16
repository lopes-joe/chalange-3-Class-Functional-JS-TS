import { Component, useEffect, useState } from 'react';
import Header from '../../components/Header';
import api from '../../services/api';
import Food from '../../components/Food';
import ModalAddFood from '../../components/ModalAddFood';
import ModalEditFood from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';

interface Dashboard {
    foods: [],
    editingFood: {
      id: string
    },
    modalOpen: boolean,
    editModalOpen: boolean
}
interface FoodType {
  id: string,
  name: string,
  image : string,
  description: string,
  price: number,
  available : boolean
}

function Dashboard(props : Dashboard){
  const [dashboard, setDashboard] = useState({
    foods: [] as any,
    editingFood: {} as any,
    modalOpen: false,
    editModalOpen: props.editModalOpen
  })
  const { foods, editingFood, modalOpen, editModalOpen } = dashboard;
  
  async function componentDidMount() {
    const response = await api.get('/foods');
    setDashboard({...dashboard, foods: response.data });
  }

  useEffect(()=>{
    componentDidMount()
  },[])

  const handleAddFood = async (food : FoodType) => {
    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });
      setDashboard({...dashboard, 
        modalOpen: !modalOpen, 
        foods: [...foods, response.data] 
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleUpdateFood = async (food : FoodType)=> {
    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );
      const foodsUpdated = foods.map((f : FoodType) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );
      setDashboard({...dashboard, 
        editModalOpen: !editModalOpen, 
        foods: foodsUpdated 
      });
    } catch (err) {
      console.log(err);
    }
  }

  const handleDeleteFood = async (id : string) => {
    await api.delete(`/foods/${id}`);
    const foodsFiltered = foods.filter((food : FoodType) => food.id !== id);
    setDashboard({...dashboard, foods: foodsFiltered });
  }

  const toggleModal = () => {
    setDashboard({...dashboard, modalOpen:!modalOpen });
    console.log('open Modal')
    console.log('modalState', modalOpen)
  }

  const toggleEditModal = () => {
    setDashboard({...dashboard, /*editModalOpen: !editModalOpen*/ });
  } 

  const handleEditFood = (food : FoodType) => {
    setDashboard({...dashboard, editingFood: food, editModalOpen: true });
  }

  return (
    <>
      <Header openModal={toggleModal} />
      <ModalAddFood
        isOpen={modalOpen}
        setIsOpen={toggleModal}
        handleAddFood={handleAddFood}
      />
      <ModalEditFood
        isOpen={editModalOpen}
        setIsOpen={toggleEditModal}
        editingFood={editingFood}
        handleUpdateFood={handleUpdateFood}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map((food : FoodType) => (
            <Food
              key={food.id}
              food={food}
              handleDelete={handleDeleteFood}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}

/* ======================================================================= */
/*class Dashboard extends Component<Dashboard>{
  constructor(props : Dashboard) {
    super(props);
    this.state = {
      foods: [],
      editingFood: {},
      modalOpen: false,
      editModalOpen: false,
    } 
  }

  async componentDidMount() {
    const response = await api.get('/foods');

    this.setState({ foods: response.data });
  }

  handleAddFood = async (food : FoodType) => {
    const { foods } = this.state as Dashboard;

    try {
      const response = await api.post('/foods', {
        ...food,
        available: true,
      });

      this.setState({ foods: [...foods, response.data] });
    } catch (err) {
      console.log(err);
    }
  }

  handleUpdateFood = async (food : FoodType)=> {
    const { foods, editingFood } = this.state as Dashboard;

    try {
      const foodUpdated = await api.put(
        `/foods/${editingFood.id}`,
        { ...editingFood, ...food },
      );

      const foodsUpdated = foods.map((f : FoodType) =>
        f.id !== foodUpdated.data.id ? f : foodUpdated.data,
      );

      this.setState({ foods: foodsUpdated });
    } catch (err) {
      console.log(err);
    }
  }

  handleDeleteFood = async (id : string) => {
    const { foods } = this.state as Dashboard;

    await api.delete(`/foods/${id}`);

    const foodsFiltered = foods.filter((food : FoodType) => food.id !== id);

    this.setState({ foods: foodsFiltered });
  }

  toggleModal = () => {
    const { modalOpen } = this.state as Dashboard;
    this.setState({ modalOpen: !modalOpen });
    console.log('open Modal')
    console.log(modalOpen)
  }

  toggleEditModal = () => {
    const { editModalOpen } = this.state as Dashboard;

    this.setState({ editModalOpen: !editModalOpen });
  }

  handleEditFood = (food : FoodType) => {
    this.setState({ editingFood: food, editModalOpen: true });
  }

  render() {
    const { modalOpen, editModalOpen, editingFood, foods } = this.state as Dashboard;

    return (
      <>
        <Header openModal={this.toggleModal} />
        <ModalAddFood
          isOpen={modalOpen}
          setIsOpen={this.toggleModal}
          handleAddFood={this.handleAddFood}
        />
        <ModalEditFood
          isOpen={editModalOpen}
          setIsOpen={this.toggleEditModal}
          editingFood={editingFood}
          handleUpdateFood={this.handleUpdateFood}
        />

        <FoodsContainer data-testid="foods-list">
          {foods &&
            foods.map((food : FoodType) => (
              <Food
                key={food.id}
                food={food}
                handleDelete={this.handleDeleteFood}
                handleEditFood={this.handleEditFood}
              />
            ))}
        </FoodsContainer>
      </>
    );
  }
};*/

export default Dashboard;
