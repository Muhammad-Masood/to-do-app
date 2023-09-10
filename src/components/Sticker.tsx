
type ToDoSticker = {
    title:string
    date:string;
    desc:string;
}

const Sticker = (sticker:ToDoSticker) => {
  console.log(sticker);
  // get the bg-color of sticker
    return (
    <div className="">
        <p>New Sticker</p>
    </div>
  )
}

export default Sticker