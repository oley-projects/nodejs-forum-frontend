interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  return <div>{children}</div>;
};

export default PrivateRoute;
