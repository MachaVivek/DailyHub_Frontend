import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Document, Page, View, Text,StyleSheet, PDFViewer } from "@react-pdf/renderer";
import CircleLoader from "react-spinners/CircleLoader";
const styles = StyleSheet.create({
    page: {
        flexDirection: "column",
        backgroundColor: "#E4E4E4"
    },
    section: {
        margin: 10,
        padding: 10,
        flexGrow: 1
    }
})
const ViewFormDetails = () => {
  const { id } = useParams();
  const [formDetails, setFormDetails] = useState(null);
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading]= useState(false);
  useEffect(() => {
      setLoading(true);
      window.onload = () => {
          setLoading(false); // Set loading to false when the entire page is loaded
      };
      return () => {
          window.onload = null;
      };
  }, []);
  useEffect(() => {
    const fetchFormDetails = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/readstoryfile/${id}`);
        setFormDetails(response.data);
      } catch (error) {
        console.error("Error fetching form details:", error);
      }
    };

    fetchFormDetails();
  }, [id]);

  var docs=[]
  if (!formDetails) {
    return <div>Loading...</div>;
  }
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
};
  const handleButton1Click = async() => {
    const options = {
        method: 'GET',
        url: `https://words-definitions-dictionary-and-data-api.p.rapidapi.com/en/${inputValue}`,
        headers: {
          'X-RapidAPI-Key': '36e1e559d6mshf78886c44acf212p11d116jsna7d4cea738ec',
          'X-RapidAPI-Host': 'words-definitions-dictionary-and-data-api.p.rapidapi.com'
        }
      };
      try {
          const response = await axios.request(options);
        //   console.log(response.data);
          const res= response.data;
          let output = "";
          output += res[0].word + "\n";
        //   console.log(res[0].word)
        //   console.log(res[0].meanings)
          res[0].meanings.forEach(element => {
            // console.log(element.partOfSpeech)
            output += "\n" + element.partOfSpeech + "\n";
            var temp1= element.definitions;
            var temp2= element.synonyms;
            var temp3= element.antonyms;
            if(temp1.length>0){
                // console.log(temp1[0].definition)
                output += element.definitions[0].definition + "\n";
            }
            if(temp2.length>0){
                // console.log(temp2[0])
                output += element.synonyms[0] + "\n";
            }
            if(temp3.length>0){
                output += element.antonyms[0] + "\n";
                // console.log(temp3[0])
            }
          });
          window.alert(output);
      } catch (error) {
          console.error(error);
      }
};

  return (
    <div className="container mt-5" style={{backgroundColor: "#708328"}}>
      {
        loading ? 
        <CircleLoader
        color={"#36d7b7"}
        loading={loading}
        size={150}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
      :
      <div style={{backgroundColor: "#708328",width: "100%",height: "100%"}}>
      <div>
        <div style={{border:"3px solid black",padding: "2%",margin: "2%", display: "flex", alignItems: "center",borderRadius: "5px"}}>
        <div>
        <h4>Get the meaning of any word</h4>
        </div>
        <br></br>
            <div style={{flex: "1",padding: "5px"}}>
                <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Enter text"
                />
            </div>
            <button onClick={handleButton1Click} style={{marginLeft: "5px", backgroundColor: "rgb(173, 216, 230)"}}>Get information</button>
        </div>
        <div style={{border:"3px solid black",padding: "2%",margin: "2%",alignItems: "center",borderRadius: "5px"}}>
      <p style={{fontWeight: "bold",fontSize: "20px",alignContent: "center",justifyContent: "center",textAlign: "center"}}> {formDetails.title}</p>
      <p><strong>Genre:</strong> {formDetails.genere}</p>
      <p><strong>Author:</strong> {formDetails.author}</p>
      <iframe
            src={formDetails?.storyfileUrl}
            width="100%"
            height="800px"
            style={{border: "none"}}
        />
      </div>
      </div>
      </div>
      }
    </div>
  );
};

export default ViewFormDetails;
