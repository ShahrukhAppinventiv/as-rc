import useBreadcrumbs from "../../components/breadcrumbs/helper";

const useDashboard = () => {
  const breadcrumbs = useBreadcrumbs("DASHBAORD");
  return {
    breadcrumbs,
  };
};
export default useDashboard;
