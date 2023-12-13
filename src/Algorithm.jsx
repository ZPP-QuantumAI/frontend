function Algorithm({ code, setCode }) {
  return (
    <div className="flex justify-around">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCode(e.target[0].value);
        }}
        className="flex flex-col"
      >
        <textarea defaultValue={code} rows="4" cols="40"></textarea>
        <button type="submit">Add code</button>
      </form>
    </div>
  );
}

export { Algorithm };
