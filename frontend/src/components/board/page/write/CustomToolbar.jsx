export const CustomToolbar = () => (
    <div id="toolbar">
    <span className="ql-formats">
      <select className="ql-size" defaultValue="medium">
        <option value="small">Small</option>
        <option value="medium">Medium</option>
        <option value="large">Large</option>
        <option value="huge">Huge</option>
      </select>
    </span>
        <span className="ql-formats">
      <button className="ql-bold" />
      <button className="ql-italic" />
      <button className="ql-underline" />
      <button className="ql-strike" />
      <button className="ql-blockquote" />
    </span>
        <span className="ql-formats">
      <select className="ql-color" />
      <select className="ql-background" />
    </span>
        <span className="ql-formats">
      <button className="ql-image" />
      <button className="ql-video" />
    </span>
        <span className="ql-formats">
      <button className="ql-clean" />
    </span>
    </div>
);