import { Routes, Route } from 'react-router-dom';
import TT from '../../container/About/tt';
import CC from '../../container/About/cc';

export default function About() {
  return (
    <div>
      About
      <Routes>
        <Route path="tt" element={<TT />} />
        <Route path="cc" element={<CC />} />
      </Routes>
    </div>
  );
}
