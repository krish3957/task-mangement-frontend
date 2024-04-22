import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { styled } from 'styled-components';
import axios from 'axios';
import dateFormat from 'dateformat';
import { useSelector } from 'react-redux';
const Container = styled.div`
    width: 100vw;
    overflow: hidden;
`
const Wrapper = styled.div`
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    position: relative;
    width: 100vw; 
`

const Left = styled.div`
    background-color: white;
    color: black;
    flex:1;
    display: flex;
    width: 100vw;
    height: 10vh;
    flex-direction: row;
`
const Right = styled.div`
    min-height: 81vh;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
    background-color: #ececec;
    flex:5;
`
const SubTitle = styled.h3`
    margin-left:15px;
    color: black;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
    font-weight: 300;
`

const CheckBox = styled.input`
    margin-left:15px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 70px;
    border: 2px solid #30cfd0;
    border-radius: 5px;
    background-color: transparent;
    position: relative;
    margin-right: 10px;
  cursor: pointer;
`

const RightWrapper = styled.div`
    padding: 10px;
    width: 80vw;
    height: auto;
    display: flex;
    flex-wrap: wrap;
    justify-content:space-between;
    border-radius: 10px;
    transition: border-radius 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    box-shadow: inset 0 -3em 3em rgba(0,0,0,0.1),
             0 0  0 2px rgb(190, 190, 190),
             0.3em 0.3em 1em rgba(0,0,0,0.3);
`

const Label = styled.label`
  font-size: 18px;
  color: #000;
  cursor: pointer;
  user-select: none;
  display: flex;
  justify-content: center;
  justify-items: center;
    align-items: center;
`


const Link = styled.a`
    color: black;
    text-decoration: none;
`

const Option = styled.option`
    width:50px;
`

const Select = styled.select`
    width: 100px;
    margin: 20px;
    height:30px;
`
const Comleted = styled.div`
    background-color: ${props => props.type === 'pending' ? 'darkred' : props.type === 'completed' ? 'blue' : 'Orange'};
    color: white;
    width:100px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 0px;
    border-radius: 5px;
    
`
const Delete = styled.button`
    background-color: orange;
    color: white;
    width:70px;
    height:30px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    right: 10px;
    bottom:10px;
    border-radius: 5px;
    
`
const Book = styled.div`
    position: relative;
  border-radius: 10px;
  width: 48%;
  height: auto;
  background-color: whitesmoke;
  -webkit-box-shadow: 1px 1px 12px #000;
  box-shadow: 1px 1px 12px #000;
  -webkit-transform: preserve-3d;
  -ms-transform: preserve-3d;
  transform: preserve-3d;
  -webkit-perspective: 2000px;
  perspective: 2000px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  flex-direction: column;
  -webkit-box-align: center;
  -ms-flex-align: center;
  padding-left: 10px;
  align-items: start;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: start;
  color: #000;
  margin:10px 0;
`
const Heading = styled.h3`
`

const P = styled.p`
    margin:5px 0;
`

const Tasks = () => {
    const User = useSelector(state => state.user.currentUser);
    const [loading, setLoading] = useState(false);
    const [items, setItems] = useState([]);
    const [priority, setPriority] = useState([]);
    const [sort, setSort] = useState("priority")
    const [completed, setCompleted] = useState(false);
    const handleCompleted = (({ currentTarget: input }) => {
        setCompleted(input.value);
    });
    const handleChange = (e) => {
        if (e.target.checked) {
            setPriority([...priority, e.target.value]);
        }
        else {
            setPriority(priority.filter((item) => item !== e.target.value));
        }
    }

    const hadndleSort = (e) => {
        setSort(e.target.value);
    }
    useEffect(() => {
        const getItems = () => {
            const url = `https://task-management-backend-gmyf.vercel.app/api/tasks/${User._id}?completed=${completed}&priority=${priority}&sort=${sort}`;
            axios.get(url).then(result => {
                setItems(result.data.task);
            });
        }
        getItems();
    }, [completed, priority, sort, User]);

    const priorityOptions = ["none", "High", "Medium", "Low"];

    const handleDelete = (e) => {
        try {
            setLoading(true);
            const id = e.target.getAttribute("data-value")
            axios.delete("https://task-management-backend-gmyf.vercel.app/api/tasks/" + id);
            console.log('deleted');
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }


    return (
        <Container>
            <Navbar />
            <Wrapper>
                <Left>
                    <SubTitle>Filter By Priority:</SubTitle>

                    <Label>
                        <CheckBox type="checkbox" value={1} onChange={handleChange} />
                        High
                    </Label>
                    <Label>
                        <CheckBox type="checkbox" value={2} onChange={handleChange} />
                        Medium
                    </Label>
                    <Label>
                        <CheckBox type="checkbox" value={3} onChange={handleChange} />
                        Low
                    </Label>


                    <SubTitle>Filter By:</SubTitle>
                    <Select onChange={handleCompleted}>
                        <Option value="All">
                            All
                        </Option>
                        <Option value={true} selected>
                            Completed
                        </Option>
                        <Option value={false}>
                            Not Completed
                        </Option>
                    </Select>
                    <SubTitle>Sort By:</SubTitle>
                    <Select onChange={hadndleSort}>
                        <Option value="Priority" selected>
                            Priority
                        </Option>
                        <Option value="deadline">
                            Deadline
                        </Option>
                        <Option value="createdAt">
                            Create Date
                        </Option>
                    </Select>
                </Left>
                <Right>
                    <RightWrapper>
                        {items.map((item, index) => (
                            <Book>
                                <input type='checkbox' value={item.completed} onChange={(e) => {
                                    if (e.target.checked) {
                                        axios.put("https://task-management-backend-gmyf.vercel.app/api/tasks/update/" + item._id, {
                                            ...item,
                                            completed: true
                                        }).then(res => {
                                            console.log(res);
                                        });
                                    }
                                }} />Comleted
                                <Heading>Task: {item.task}</Heading>
                                <P>{item.desc}</P>
                                <P>Priority: {priorityOptions[item.priority]}</P>
                                <P>Deadline:{dateFormat(item.deadline, 'dd/mm/yyyy')}</P>
                                {dateFormat(item.deadline, 'dd/mm/yyyy') < dateFormat(Date.now(), 'dd/mm/yyyy') ? <Comleted type='pending'>Pending</Comleted > : (item.completed ? <Comleted type='completed'>Completed</Comleted> : <Comleted type='incomplete'>InComplete</Comleted>)}
                                <Delete data-value={item._id} onClick={handleDelete}>delete</Delete>
                                <Link href={'/item/' + item._id}></Link>
                            </Book>
                        ))}
                    </RightWrapper>
                </Right>
                {loading && <Heading>loading</Heading>}
            </Wrapper>
        </Container>
    )
}

export default Tasks;
