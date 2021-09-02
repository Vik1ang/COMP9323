import logo from './logo.svg';
import './App.css';
// import './index.scss';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import './css/all.min.css';
import './css/bootstrap.min.css'
import './css/simple-line-icons.css'
import './css/slick.css'
import './css/style.css'


import Landing from './pages/landing'
import Login from './pages/login'

//User
import UHomePage from './pages/Users/uHomePage'
import UCommunity from './pages/Users/uCommunity'
import UTutorial from './pages/Users/uTutorial'
import UQnA from './pages/Users/uQnA'
import UExperience from './pages/Users/uExperience'
import UArticle from './pages/Users/uArticle'
import UAdd from './pages/Users/uAdd'
import UAddCommunity from './pages/Users/uAddCommunity'
import ULetter from './pages/Users/uLetter'

import UserInfo from './pages/Mypages/uInfo'
import Search from './pages/Mypages/uSearch'
import Upay from './pages/Mypages/uPay'
import AllExpert from './pages/Users/uAllExpert'

//Admin
import AHomePage from './pages/Admin/aHomePage'
import AExpert from './pages/Admin/aExpert'
import AData from './pages/Admin/aData'
import AExpertsOrder from './pages/Admin/aExpertOrder'
import AExpertApplications from './pages/Admin/aExpertApplication'
import SignUp from './pages/signup'
import ExpertCard from './pages/Admin/aExpertCard'
import ALetter from './pages/Admin/aLetter'
// hanyuan
import UserEdit from './pages/Mypages/UserEdit'



function App() {
  return (
    <>
      <BrowserRouter basename={'/'} >
          <Switch>
              <Route exact path="/" component={Landing}/>
              <Route exact path="/login" component={Login}/>
              <Route exact path="/signup" component={SignUp}/>

              {/* User */}
              <Route exact path="/userHomePage" component={UHomePage}/>
              <Route exact path="/userCommunity" component={UCommunity}/>
              <Route exact path="/userTutorial/:community" component={UTutorial}/>
              <Route exact path="/userQnA/:community" component={UQnA}/>
              <Route exact path="/userExperience/:community" component={UExperience}/>
              <Route exact path="/userArticle/:community/:type/:Pid" component={UArticle}/>
              <Route exact path="/userAdd/:community/:type" component={UAdd}/>
              <Route exact path="/userAddCommunity" component={UAddCommunity}/>

              <Route exact path="/uletter" component={ULetter} />
              

              {/* Admin */}
              <Route exact path="/adminHomePage" component={AHomePage}/>
              <Route exact path="/adminExpert" component={AExpert}/>
              <Route exact path="/adminExpertOrders" component={AExpertsOrder}/>
              <Route exact path="/adminExpertApplications" component={AExpertApplications}/>
              <Route exact path="/adminData" component={AData}/>
              <Route exact path={"/adminInfo/:type/:ExpertID"} component={ExpertCard}/>
              <Route exact path="/adminLetter" component={ALetter}/>

              <Route exact path="/userInfo/:userID" component={UserInfo}/>
              <Route exact path="/search/:content" component={Search}/>
              <Route exact path="/pay/:userId/:expertId" component={Upay}/>
              <Route exact path="/allExpert" component={AllExpert}/>

          {/* hanyuan */}
              <Route exact path="/UserEdit" component={UserEdit}/>
              
          {/* hanyuan */}
          </Switch>
      </BrowserRouter>
    </>
    
  );
}

export default App;
