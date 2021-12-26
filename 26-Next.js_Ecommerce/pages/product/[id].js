import Stars from "../../components/Stars";
import { BsFillSuitHeartFill} from "react-icons/bs";
import toast, { Toaster } from 'react-hot-toast';
import { useState } from "react";
import { useGlobalContext } from "../../components/Context";

export const getStaticPaths = async ()=>{
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();

    const paths = data.map(i=>{
        return {
            params: {id: i.id.toString()}
        }
    })
 
    return {
        paths,
        fallback:false
    }
}

export const getStaticProps = async (context)=>{
    const id = context.params.id;
    const res = await fetch('https://fakestoreapi.com/products/'+id);
    const data = await res.json();

    return {props:{product:data}}
}


const singleproduct = ({product}) => {

   

    const {id,title,price,description,category,image,rating:{rate,count}} = product;
    const notify = () => toast('Succesfuly added to favourities');

     const {fav,setFav,setFavitems} = useGlobalContext();

    const handleClick = (e)=>{
        e.preventDefault();  
        let item = {id,image,title,price,description};
        setFavitems(prevState=> [...prevState,item])
        
    }
    return (
        <div className="container" key={id}>
            <div className="left">
                <img src={image} alt={title} />
            </div>
           
           <div className="right">
             <p className="title">{title}</p>
             <Stars stars={rate} reviews={count}/>
             <p className="price">$ {price}</p>
             <p className="description">{description}</p>
             
             <div className="button-container">
                <button type="button" className="css-button-3d--blue">Buy</button>
                
                <button type="button"  title='Add to favourities' onClick={(e,id,image,title,price,description) => { notify(); handleClick(e,id,image,title,price,description)}} className="favourite"><BsFillSuitHeartFill/></button>
                <Toaster
                toastOptions={{
                    className: '',
                    style: {
                        backgroundColor:'#22c55e',
                        color:'#fff',
                        fontSize:'15px',
                        
                    },
                }}
                />
                <p>Share it with : a b c</p>
             </div>

           </div>

            <style jsx>{`

            .css-button-3d--blue {
                min-width: 230px;
                height: 40px;
                color: #fff;
                padding: 5px 10px;
                font-weight: bold;
                cursor: pointer;
                transition: all 0.3s ease;
                position: relative;
                display: inline-block;
                outline: none;
                border-radius: 5px;
                border: none;
                background: #fbbf24;
                box-shadow: 0 5px #f59e0b;
                }
                .css-button-3d--blue:hover {
                box-shadow: 0 3px #f59e0b;
                top: 1px;
                }
                .css-button-3d--blue:active {
                box-shadow: 0 0 #f59e0b;
                top: 5px;
                }

                .container{
                    display:flex;
                    width:80vw;
                    margin:4rem auto;
                }
                .left{
                    margin-right:4rem;                    
                }
                .right{
                    letter-spacing:1px;
                    width:40vw;

                }
                .title{
                    font-weight:bold;
                    font-size:2rem;
                }
                .price{
                    font-weight:bold;
                    font-size:1.4rem;
                }
              
                
                .favourite{
                    background-color:#fff;
                    padding:0.5rem 0.3rem;
                    margin-left:2rem;
                    cursor:pointer;                    
                }

                img{
                    width:300px;
                    object-fit:contain;

                }
                
                
                `}

            </style>
        </div>
    )
}

export default singleproduct
