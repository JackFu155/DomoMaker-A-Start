const handleDomo = (e) =>{
    e.preventDefault();

    $("#domoMessage").animate({width:'hide'},350);

    if($("#domoName").val() == '' || $("#domoScore").val() == ''){
        handleError("Sorry! All fields are required");
        return false;
    }

    sendAjax('POST', $("#domoForm").attr("action"), $("#domoForm").serialize(), function() {
        loadDomosFromServer();
    });

    return false;
};

const DomoForm = (props) =>{
    return(
        <form id="domoForm"
              onSubmit={handleDomo}
              name="domoForm"
              action="/maker"
              method="POST"
              className="domoForm"
        >
            <label htmlFor="name">Name: </label>
            <input id="domoName" type="text" name="name" placeholder="Player Name"/>
            <label htmlFor="score">Score: </label>
            <input id="domoScore" type="number" name="score" placeholder="Score"/>
            <input type="hidden" name="_csrf" value={props.csrf} />
            <input className="makeDomoSubmit" type="submit" value="Post Score"/>
        </form>
    );
};

const DomoList = function(props){
    if(props.domos.length === 0){
        return(
            <div className="domoList">
                <h3 className="emptyDomo">No Scores Posted</h3>
            </div>
        );
    }

    const domoNodes = props.domos.map(function(domo){
        return(
            <div key={domo._id} className="domo">
                
                <h3 className="domoName"> {domo.name}: </h3>
                <h3 className="domoScore">{domo.score} </h3>
            </div>
        );
    });

    return(
        <div className="domoList">
            {domoNodes}
        </div>
    );
};

const loadDomosFromServer = () =>{
    sendAjax('GET', '/getDomos', null, (data) =>{
        ReactDOM.render(
            <DomoList domos={data.domos} />, document.querySelector("#domos")
        );
    });
};

const setup = function(csrf){
    ReactDOM.render(
        <DomoForm csrf={csrf} />, document.querySelector("#makeDomo")
    );

    ReactDOM.render(
        <DomoList domos={[]} />, document.querySelector("#domos")
    );
};

const getToken = () =>{
    sendAjax('GET', '/getToken', null, (result) =>{
        setup(result.csrfToken);
    });
};

$(document).ready(function(){
    getToken();
    loadDomosFromServer();
})