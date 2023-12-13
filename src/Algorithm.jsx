function Algorithm({ code, setCode }) {
  return (
    <div className="flex justify-around">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setCode(e.target[0].value);
        }}
        className="flex flex-col gap-2"
      >
        <textarea className="border-2 border-black" defaultValue={code} rows="4" cols="40"></textarea>
        <button className="border-2 border-black" type="submit">Add code</button>
      </form>
    </div>
  );
}

export { Algorithm };
