import React, { useContext } from 'react';

/// React router dom
import { Switch, Route } from 'react-router-dom';

/// Css
import './index.css';
import './chart.css';
import './step.css';

/// Layout
import Nav from './layouts/nav';
import Footer from './layouts/Footer';
// /// Dashboard
// import Home from './components/Dashboard/Home';
// import DashboardDark from './components/Dashboard/DashboardDark';
// import Jobs from './components/Dashboard/Jobs';
// import Applications from './components/Dashboard/Applications';
// import MyProfile from './components/Dashboard/MyProfile';
// import Companies from './components/Dashboard/Companies';
// import Task from './components/Dashboard/Task';

// //Jobs
// import JobLists from './components/Jobs/JobLists';
// import JobView from './components/Jobs/JobView';
// import JobApplication from './components/Jobs/JobApplication';
// import ApplyJob from './components/Jobs/ApplyJob';
// import NewJob from './components/Jobs/NewJob';
// import UserProfile from './components/Jobs/UserProfile';

// /// App
// import AppProfile from './components/AppsMenu/AppProfile/AppProfile';
// import Compose from './components/AppsMenu/Email/Compose/Compose';
// import Inbox from './components/AppsMenu/Email/Inbox/Inbox';
// import Read from './components/AppsMenu/Email/Read/Read';
// import Calendar from './components/AppsMenu/Calendar/Calendar';
// import PostDetails from './components/AppsMenu/AppProfile/PostDetails';

// /// Product List
// import ProductGrid from './components/AppsMenu/Shop/ProductGrid/ProductGrid';
// import ProductList from './components/AppsMenu/Shop/ProductList/ProductList';
// import ProductDetail from './components/AppsMenu/Shop/ProductGrid/ProductDetail';
// import Checkout from './components/AppsMenu/Shop/Checkout/Checkout';
// import Invoice from './components/AppsMenu/Shop/Invoice/Invoice';
// import ProductOrder from './components/AppsMenu/Shop/ProductOrder';
// import Customers from './components/AppsMenu/Shop/Customers/Customers';

// /// Charts
// import SparklineChart from './components/charts/Sparkline';
// import ChartJs from './components/charts/Chartjs';
// import Chartist from './components/charts/chartist';
// import RechartJs from './components/charts/rechart';
// import ApexChart from './components/charts/apexcharts';

// /// Bootstrap
// import UiAlert from './components/bootstrap/Alert';
// import UiAccordion from './components/bootstrap/Accordion';
// import UiBadge from './components/bootstrap/Badge';
// import UiButton from './components/bootstrap/Button';
// import UiModal from './components/bootstrap/Modal';
// import UiButtonGroup from './components/bootstrap/ButtonGroup';
// import UiListGroup from './components/bootstrap/ListGroup';
// import UiMediaObject from './components/bootstrap/MediaObject';
// import UiCards from './components/bootstrap/Cards';
// import UiCarousel from './components/bootstrap/Carousel';
// import UiDropDown from './components/bootstrap/DropDown';
// import UiPopOver from './components/bootstrap/PopOver';
// import UiProgressBar from './components/bootstrap/ProgressBar';
// import UiTab from './components/bootstrap/Tab';
// import UiPagination from './components/bootstrap/Pagination';
// import UiGrid from './components/bootstrap/Grid';
// import UiTypography from './components/bootstrap/Typography';

// /// Plugins
// import Select2 from './components/PluginsMenu/Select2/Select2';
// import Nestable from './components/PluginsMenu/Nestable/Nestable';
// import MainNouiSlider from './components/PluginsMenu/Noui Slider/MainNouiSlider';
// import MainSweetAlert from './components/PluginsMenu/Sweet Alert/SweetAlert';
// import Toastr from './components/PluginsMenu/Toastr/Toastr';
// import JqvMap from './components/PluginsMenu/Jqv Map/JqvMap';
// import Lightgallery from './components/PluginsMenu/Lightgallery/Lightgallery';

// //Redux
// import Todo from './pages/Todo';
// import ReduxForm from './components/Forms/ReduxForm/ReduxForm';
// import WizardForm from './components/Forms/ReduxWizard/Index';

// /// Widget
// import Widget from './pages/Widget';

// /// Table
// import SortingTable from './components/table/SortingTable/SortingTable';
// import FilteringTable from './components/table/FilteringTable/FilteringTable';
// import DataTable from './components/table/DataTable';
// import BootstrapTable from './components/table/BootstrapTable';

// /// Form
// import Element from './components/Forms/Element/Element';
// import Wizard from './components/Forms/Wizard/Wizard';
// import SummerNote from './components/Forms/Summernote/SummerNote';
// import Pickers from './components/Forms/Pickers/Pickers';
// import jQueryValidation from './components/Forms/jQueryValidation/jQueryValidation';

// /// Pages
// import Registration from './pages/Registration';
// import Login from './pages/Login';
// import ForgotPassword from './pages/ForgotPassword';
// import LockScreen from './pages/LockScreen';
// import Error400 from './pages/Error400';
// import Error403 from './pages/Error403';
// import Error404 from './pages/Error404';
// import Error500 from './pages/Error500';
// import Error503 from './pages/Error503';
import Setting from './layouts/Setting';
import { ThemeContext } from '../context/ThemeContext';

// App Pages
import Addcategory from './pages/category/AddCategory';
import ViewCategories from './pages/category/ViewCategories';
import EditCategory from './pages/category/EditCategory';
import ViewNews from './pages/news/ViewNews';
import AddNews from './pages/news/AddNews';
import EditNews from './pages/news/EditNews';
import AddTeam from './pages/team/AddTeam';
import ViewTeam from './pages/team/ViewTeam';
import EditTeam from './pages/team/EditTeam';
import ViewCast from './pages/cast/ViewCast';
import AddCast from './pages/cast/AddCast';
import EditCast from './pages/cast/EditCast';
import AddMovie from './pages/movie/AddMovie';
import ViewMovie from './pages/movie/ViewMovie';
import EditMovie from './pages/movie/EditMovie';
import AddMovie1 from './pages/movie/AddMovie1';
import AddMovie2 from './pages/movie/AddMovie2';
import AddMovie3 from './pages/movie/AddMovie3';
import AddMovie4 from './pages/movie/AddMovie4';
import ViewMovieDetail from './pages/movie/ViewMovieDetail';
import EditMovie1 from './pages/movie/EditMovie1';
import EditMovie2 from './pages/movie/EditMovie2';
import EditMovie3 from './pages/movie/EditMovie3';
import EditMovie4 from './pages/movie/EditMovie4';
import PressNews from './pages/news/PressNews';
import AddSocial from './pages/social/AddSocial';
import ViewSocial from './pages/social/ViewSocial';
import EditSocial from './pages/social/EditSocial';
import MovieOrder from './pages/movie/MovieOrder';
import Banner from './pages/banner/Banner';
import Dashboard from './components/Dashboard/Dashboard';
import AboutBanner from './pages/banner/AboutBanner';

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);
  const routes = [
    /// Dashboard
    { url: '', component: Dashboard },
    { url: 'dashboard', component: Dashboard },
    // { url: 'dashboard-dark', component: DashboardDark },
    // { url: 'search-jobs', component: Jobs },
    // { url: 'applications', component: Applications },
    // { url: 'my-profile', component: MyProfile },
    // { url: 'statistics', component: Statistics },
    // { url: 'companies', component: Companies },
    // { url: 'task', component: Task },

    //Jobs
    // { url: 'job-list', component: JobLists },
    // { url: 'job-view', component: JobView },
    // { url: 'job-application', component: JobApplication },
    // { url: 'apply-job', component: ApplyJob },
    // { url: 'new-job', component: NewJob },
    // { url: 'user-profile', component: UserProfile },

    /// Apps
    // { url: 'app-profile', component: AppProfile },
    // { url: 'email-compose', component: Compose },
    // { url: 'email-inbox', component: Inbox },
    // { url: 'email-read', component: Read },
    // { url: 'app-calender', component: Calendar },
    // { url: 'post-details', component: PostDetails },

    /// Chart
    // { url: 'chart-sparkline', component: SparklineChart },
    // { url: 'chart-chartjs', component: ChartJs },
    // { url: 'chart-chartist', component: Chartist },
    // { url: 'chart-apexchart', component: ApexChart },
    // { url: 'chart-rechart', component: RechartJs },

    // /// Bootstrap
    // { url: 'ui-alert', component: UiAlert },
    // { url: 'ui-badge', component: UiBadge },
    // { url: 'ui-button', component: UiButton },
    // { url: 'ui-modal', component: UiModal },
    // { url: 'ui-button-group', component: UiButtonGroup },
    // { url: 'ui-accordion', component: UiAccordion },
    // { url: 'ui-list-group', component: UiListGroup },
    // { url: 'ui-media-object', component: UiMediaObject },
    // { url: 'ui-card', component: UiCards },
    // { url: 'ui-carousel', component: UiCarousel },
    // { url: 'ui-dropdown', component: UiDropDown },
    // { url: 'ui-popover', component: UiPopOver },
    // { url: 'ui-progressbar', component: UiProgressBar },
    // { url: 'ui-tab', component: UiTab },
    // { url: 'ui-pagination', component: UiPagination },
    // { url: 'ui-typography', component: UiTypography },
    // { url: 'ui-grid', component: UiGrid },

    // /// Plugin
    // { url: 'uc-select2', component: Select2 },
    // { url: 'uc-nestable', component: Nestable },
    // { url: 'uc-noui-slider', component: MainNouiSlider },
    // { url: 'uc-sweetalert', component: MainSweetAlert },
    // { url: 'uc-toastr', component: Toastr },
    // { url: 'map-jqvmap', component: JqvMap },
    // { url: 'uc-lightgallery', component: Lightgallery },

    // ///Redux
    // { url: 'todo', component: Todo },
    // { url: 'redux-form', component: ReduxForm },
    // { url: 'redux-wizard', component: WizardForm },

    // /// Widget
    // { url: 'widget-basic', component: Widget },

    // /// Shop
    // { url: 'ecom-product-grid', component: ProductGrid },
    // { url: 'ecom-product-list', component: ProductList },
    // { url: 'ecom-product-detail', component: ProductDetail },
    // { url: 'ecom-product-order', component: ProductOrder },
    // { url: 'ecom-checkout', component: Checkout },
    // { url: 'ecom-invoice', component: Invoice },
    // { url: 'ecom-product-detail', component: ProductDetail },
    // { url: 'ecom-customers', component: Customers },

    // /// Form
    // { url: 'form-element', component: Element },
    // { url: 'form-wizard', component: Wizard },
    // { url: 'form-editor-summernote', component: SummerNote },
    // { url: 'form-pickers', component: Pickers },
    // { url: 'form-validation-jquery', component: jQueryValidation },

    // /// table
    // { url: 'table-filtering', component: FilteringTable },
    // { url: 'table-sorting', component: SortingTable },
    // { url: 'table-datatable-basic', component: DataTable },
    // { url: 'table-bootstrap-basic', component: BootstrapTable },

    // /// pages
    // { url: 'page-register', component: Registration },
    // { url: 'page-lock-screen', component: LockScreen },
    // { url: 'page-login', component: Login },
    // { url: 'page-forgot-password', component: ForgotPassword },
    // { url: 'page-error-400', component: Error400 },
    // { url: 'page-error-403', component: Error403 },
    // { url: 'page-error-404', component: Error404 },
    // { url: 'page-error-500', component: Error500 },
    // { url: 'page-error-503', component: Error503 },

    // my pages
    { url: 'category-add', component: Addcategory },
    { url: 'category-view', component: ViewCategories },
    { url: 'category-edit/:id', component: EditCategory },

    // news
    // { url: 'news-add', component: AddNews },
    { url: 'news-add', component: AddNews },
    { url: 'news-view', component: ViewNews },
    { url: 'news-edit/:id', component: EditNews },
    { url: 'news-press', component: PressNews },

    { url: 'team-add', component: AddTeam },
    { url: 'team-view', component: ViewTeam },
    { url: 'team-edit/:id', component: EditTeam },

    // cast

    { url: 'cast-add', component: AddCast },
    { url: 'cast-view', component: ViewCast },
    { url: 'cast-edit/:id', component: EditCast },

    // Movie
    { url: 'movie-add', component: AddMovie },
    { url: 'movie-add/1/:movie_id', component: AddMovie1 },
    { url: 'movie-add/2/:movie_id', component: AddMovie2 },
    { url: 'movie-add/3/:movie_id', component: AddMovie3 },
    { url: 'movie-add/4/:movie_id', component: AddMovie4 },
    { url: 'movie-view', component: ViewMovie },
    { url: 'movie-view/:id', component: ViewMovieDetail },
    { url: 'movie-edit/:id', component: EditMovie },
    { url: 'movie-edit/1/:movie_id', component: EditMovie1 },
    { url: 'movie-edit/2/:movie_id', component: EditMovie2 },
    { url: 'movie-edit/3/:movie_id', component: EditMovie3 },
    { url: 'movie-edit/4/:movie_id', component: EditMovie4 },

    { url: 'movie-order', component: MovieOrder },

    // Social

    { url: 'social-add', component: AddSocial },
    { url: 'social-view', component: ViewSocial },
    { url: 'social-edit/:id', component: EditSocial },

    // banner
    { url: 'banner', component: Banner },
    { url: 'aboutbanner', component: AboutBanner },
  ];
  let path = window.location.pathname;
  path = path.split('/');
  path = path[path.length - 1];

  let pagePath = path.split('-').includes('page');
  return (
    <>
      <div
        id={`${!pagePath ? 'main-wrapper' : ''}`}
        className={`${!pagePath ? 'show' : 'mh100vh'}  ${
          menuToggle ? 'menu-toggle' : ''
        }`}>
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? 'content-body' : ''}`}>
          <div
            className={`${!pagePath ? 'container-fluid' : ''}`}
            style={{ minHeight: window.screen.height - 60 }}>
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <Setting />
    </>
  );
};

export default Markup;
