import SortFilter from "./SortFilter";
let Header = ({ handleSort }) => {
  return (
    <header className="header">
      <div className="left-container">
        <div className="title">
          CREATE <br />A HOUSE
        </div>
      </div>

      <div className="searchbar">
        {/* <input type="text" /> */}
        <button type="submit">SORT</button>
        <SortFilter handleSort={handleSort} />
      </div>
    </header>
  );
};
export default Header;
