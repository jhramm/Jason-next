export default function About() {
  return (
    <div className="text-center bg-amber-300 p-3 mt-3 text-red-600 font-bold">
      <h1>This is the about page.</h1>
      <ul>
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
        <li>
          <a href="/contact">Contact</a>
        </li>
      </ul>
    </div>
  );
}
