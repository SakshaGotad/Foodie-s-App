import styled from "styled-components";
import "./App.css";
import { useEffect, useState } from "react";
import SearchResult from "./components/SearchResult";

export const BASE_URL = "http://localhost:9000"
const App = () => {

 const [data, setData] = useState(null);
const [Loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [filterdata,setfilterdata] = useState(null);
const [selectedBtn, setSelectedBtn] = useState("all");


useEffect(()=>{
  const Fetchdata = async()=>{
 setLoading(true);
  try{
    const respose = await fetch(BASE_URL);
    const json = await respose.json();
    setData(json);
    setfilterdata(json);
    setLoading(false);
  }catch(error){
    setError("Unable to fetch data");
  }
};

Fetchdata();

},[])



const searchFood = (e) => {
  const searchValue = e.target.value;

  console.log(searchValue);

  if (searchValue === "") {
    setfilterdata(null);
  }

  const filter = data?.filter((food) =>
    food.name.toLowerCase().includes(searchValue.toLowerCase())
  );
  setfilterdata(filter);
};

const filterFood = (type) => {
  if (type === "all") {
    setfilterdata(data);
    setSelectedBtn("all");
    return;
  }

  const filter = data?.filter((food) =>
    food.type.toLowerCase().includes(type.toLowerCase())
  );
  setfilterdata(filter);
  setSelectedBtn(type);
};

const filterBtns = [
  {
    name: "All",
    type: "all",
  },
  {
    name: "Breakfast",
    type: "breakfast",
  },
  {
    name: "Lunch",
    type: "lunch",
  },
  {
    name: "Dinner",
    type: "dinner",
  },
];

if(error) return <div>{error}</div>
if(Loading) return <div>loading...</div>
 





  return (
    <>
    <Maincontainer>
      <Topcontainer>
        <div className="logo">
          <img src="/images/Foody Zone.svg" alt="" />
        </div>

        <div className="search">
          <input type="text" placeholder="Search Food" />
        </div>
      </Topcontainer>

      <Filtercontainer>
        <Button> Breakfast</Button>
        <Button> Lunch</Button>
        <Button> Snacks</Button>
        <Button> Dinner</Button>


      </Filtercontainer>
       
       
     
    </Maincontainer>
    <SearchResult data={filterdata}/>
    </>
  )
}

export default App


export const Maincontainer = styled.div`
max-width: 1200px;
margin: 0  auto;
`;

const Topcontainer = styled.section`
background-color: #323334;
height: 140px;
display:  flex;
flex-direction: row;
justify-content: space-between;
padding: 16px;
align-items: center;

.search{
  input{
    background-color: transparent;
    border:1px solid red;
    border-radius: 5px;
    color: white;
    height: 40px;
    padding:0 10px;
    font-size: 16px;
  }
}

`;

const Filtercontainer = styled.section`
 display: flex;
 gap: 20px;
 justify-content: center;
 padding-bottom: 40px;
`;
export const Button = styled.button`

background:#ff4343;
color: white;
border-radius: 5px;
padding: 6px 10px;
border: none;
`;


const FoodcardsContainer = styled.section`
min-height: calc(100vh - 210px);
background-image: url("./images/bg.png");
background-size: cover;
`;

const Foodcards = styled.div``;
