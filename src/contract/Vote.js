import React, {useState} from 'react';
import {ethers} from 'ethers';
import { votingABI } from '../contractABI/votingABI';
import { votingAddress } from '../contractABI/votingaddress';
import pixImg from '../img/pix.jpg'
import carmineImg from '../img/carmine.jpg'

function Vote() {

    const {ethereum} = window; 
    const [value1, setValue1] = useState(""); //stampare address account loggato
    //const [value2, setValue2] = useState(""); // Per memorizzare il voto selezionato
    const [vPix, setPix] = useState(0); //Numeri voti pix
    const [vCarmine, setCarmine] = useState(0); //Numeri voti carmine

    //rende pagina dinamica
    const [isConnected, setIsConnected] = useState(false);

    const connectMetamask = async () => {

        //Connesione Metamask
        let accounts;
        if (window.ethereum !== "undefined") {
            accounts = await ethereum.request({ method: "eth_requestAccounts"});
            console.log(accounts[0]);
            setValue1(accounts[0]);
          }

        //Connect Contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(votingAddress, votingABI, signer);

        //verifico accounts exist
        const is = await contract.isAccount();
    
        if(!is) {
            //Create Account
            const tx = await contract.createAccount();
            await tx.wait();
        }

        //Mostra votazioni
        const c = await contract.getCarmine();
        const p = await contract.getPix();

        console.log("Voti carmine:  ", c);
        console.log("Voti pix: ", p);

        setPix(Number(p));
        setCarmine(Number(c));

        //Pagina dinamica
        setIsConnected(true);
    }

    const votazione = async (x) => {

        //Connect Contract
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(votingAddress, votingABI, signer);

        //Voting
        console.log("VALORE VOTAZIONE: ", x);
        const tx = await contract.votazione(x);
        await tx.wait();
        
        //Mostra votazioni
        const c = await contract.getCarmine();
        const p = await contract.getPix();

        console.log("Voti carmine:  ", c);
        console.log("Voti pix: ", p);

        setPix(Number(p));
        setCarmine(Number(c));


        setPix(p);
        setCarmine(c);
    }



    return (
        <div
          style={{
            fontFamily: "Arial, sans-serif",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
            backgroundColor: "#f4f4f4",
          }}
        >
          {!isConnected ? (
            <>
              <h1 style={{ fontSize: "3rem", color: "black", marginBottom: "1rem" }}>
                VotingDApp
              </h1>
              <button
                style={{
                  backgroundColor: "black",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  fontSize: "1rem",
                  cursor: "pointer",
                  borderRadius: "5px",
                }}
                onClick={connectMetamask}
              >
                Connect Metamask
              </button>
            </>
          ) : (
            <>
              <h1 style={{ fontSize: "2.5rem", color: "black", marginBottom: "2rem" }}>
                {value1}
              </h1>
              <h1 style={{ fontSize: "2.5rem", color: "black", marginBottom: "2rem" }}>
                Vote for your favorite!
              </h1>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <div
                  style={{
                    width: "200px",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    padding: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const x = "pix";
                    votazione(x);
                  }}
                >
                  <img
                    src={pixImg}
                    alt="Pix"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <h3 style={{ marginTop: "1rem", fontSize: "1.5rem", color: "black" }}>
                    Pix
                  </h3>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      marginTop: "0.5rem",
                      color: "#555",
                    }}
                  >
                    Votes: {vPix}
                  </p>
                </div>
                <div
                  style={{
                    width: "200px",
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    borderRadius: "8px",
                    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
                    textAlign: "center",
                    padding: "1rem",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    const x = "carmine";
                    votazione(x);
                  }}
                >
                  <img
                    src={carmineImg}
                    alt="Carmine"
                    style={{ width: "100%", borderRadius: "8px" }}
                  />
                  <h3 style={{ marginTop: "1rem", fontSize: "1.5rem", color: "black" }}>
                    Carmine
                  </h3>
                  <p
                    style={{
                      fontSize: "1.2rem",
                      marginTop: "0.5rem",
                      color: "#555",
                    }}
                  >
                    Votes: {vCarmine}
                  </p>
                </div>
              </div>
            </>
          )}
        </div>
      );
    }
    
    export default Vote;