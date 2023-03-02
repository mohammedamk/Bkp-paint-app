import { createStackNavigator, createDrawerNavigator } from 'react-navigation'
import Login from './Login'
import Home from './Home'
import NavigationDrawer from './NavigationDrawer';
import ConsultationReport from './ConsultationReport';
import UsersList from './usersList';
import Validation from './validation';
import KycData from './KycData';
import Profile from './Profile';
import Siteinfo from './Siteinfo';
import Consultation from './todays_consultation';
import Registered from './todays_registered';
import Converted from './todays_converted';
import EventList from './EventList';
import SiteDetails from './SIteDetails';
import QueryList from './QueryList';
import ViewImages from './ShowImages';
import QueryDetails from './QueryDetail';
// import Drawer from './Screens/drawer';

const RootDrawer = createDrawerNavigator(
  {
    home: { screen: Home },
    userlist: { screen: UsersList },
    consultationreport: { screen: ConsultationReport },
    kycdata: { screen: KycData },
    profile: { screen: Profile },
    siteinfo: { screen: Siteinfo },
    events: { screen: EventList },
    sitedetails: { screen: SiteDetails },
    querylist: { screen: QueryList },
    querydetails: { screen: QueryDetails }
  },
  {
    contentComponent: NavigationDrawer,
  });

const RootNavigator = createStackNavigator({
  validationscreen: { screen: Validation },
  todays_consultation: { screen: Consultation },
  todays_registered: { screen: Registered },
  todays_converted: { screen: Converted },
  // login: { screen: Login },
  viewimages: { screen: ViewImages },
  login: { screen: Login },
  drawerstack: { screen: RootDrawer },

},
  {
    headerMode: 'none'
  })

export default RootNavigator
