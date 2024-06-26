import Image from "next/image";
import React from "react";
import section1 from "../../../public/images/sec2.jpg";

export default function MainSection() {
  return (
    <div>
      <div className="flex items-center h-[100vh]">
        <div className="w-[50%] p-[20px] text-[#333]">
          <h1 className="text-[35px]">Lorem</h1>
          <p className="text-[16px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
            maiores error necessitatibus optio accusamus cupiditate accusantium
            animi non provident veritatis odio laboriosam magni ad perferendis
            quas fuga natus dolorem reprehenderit deserunt debitis iste incidunt
            vel. Provident debitis nihil maiores doloribus iste, voluptas enim
            saepe sint ad! Consequuntur doloribus quidem temporibus quaerat
            excepturi illo obcaecati inventore nisi veniam voluptate. Sint fuga
            voluptas ex nisi, quasi illo magni perferendis vero possimus. Saepe
            eum officia consequuntur dolorum similique? Magnam adipisci veniam
            inventore vel corrupti impedit voluptas, architecto deleniti, ab,
            dolorem sint. Pariatur voluptatum dicta iste ex vitae error cumque
            placeat fuga, in eos! Libero explicabo sit ducimus veritatis
            eveniet? Itaque dolor est harum non nobis incidunt repellat maiores
            odit laborum tempora laudantium, impedit, commodi ut nisi ipsa
            quaerat magni quisquam pariatur sint facilis. Consequatur sint
            assumenda eos totam cupiditate labore perspiciatis, doloribus velit
            et animi repudiandae dignissimos vitae incidunt blanditiis illo quis
            distinctio, natus cumque quisquam! Atque itaque eaque neque, ut
            pariatur eum laborum ad, quia architecto natus quisquam soluta nisi
            fugiat reiciendis, illum a? Voluptas a architecto fugit iusto
            temporibus ad doloremque eos suscipit asperiores amet eius veniam,
            quo incidunt labore dignissimos quidem quod omnis! Illum, vero
            perferendis. Sunt reprehenderit blanditiis quo.
          </p>
        </div>
        <div className="w-[50%] p-[20px] text-[#333]">
          <Image src={section1} alt="section" className="w-[100%]" />
        </div>
      </div>
      <div className="flex gap-5 items-center h-[100vh]">
        <div className="w-[50%] p-[20px]">
          <Image src={section1} alt="section" className="w-[100%]" />
        </div>
        <div className="w-[50%] p-[20px]">
          <h1 className="text-[35px]">Lorem</h1>
          <p className="text-[16px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam,
            maiores error necessitatibus optio accusamus cupiditate accusantium
            animi non provident veritatis odio laboriosam magni ad perferendis
            quas fuga natus dolorem reprehenderit deserunt debitis iste incidunt
            vel. Provident debitis nihil maiores doloribus iste, voluptas enim
            saepe sint ad! Consequuntur doloribus quidem temporibus quaerat
            excepturi illo obcaecati inventore nisi veniam voluptate. Sint fuga
            voluptas ex nisi, quasi illo magni perferendis vero possimus. Saepe
            eum officia consequuntur dolorum similique? Magnam adipisci veniam
            inventore vel corrupti impedit voluptas, architecto deleniti, ab,
            dolorem sint. Pariatur voluptatum dicta iste ex vitae error cumque
            placeat fuga, in eos! Libero explicabo sit ducimus veritatis
            eveniet? Itaque dolor est harum non nobis incidunt repellat maiores
            odit laborum tempora laudantium, impedit, commodi ut nisi ipsa
            quaerat magni quisquam pariatur sint facilis. Consequatur sint
            assumenda eos totam cupiditate labore perspiciatis, doloribus velit
            et animi repudiandae dignissimos vitae incidunt blanditiis illo quis
            distinctio, natus cumque quisquam! Atque itaque eaque neque, ut
            pariatur eum laborum ad, quia architecto natus quisquam soluta nisi
            fugiat reiciendis, illum a? Voluptas a architecto fugit iusto
            temporibus ad doloremque eos suscipit asperiores amet eius veniam,
            quo incidunt labore dignissimos quidem quod omnis! Illum, vero
            perferendis. Sunt reprehenderit blanditiis quo.
          </p>
        </div>
      </div>
    </div>
  );
}
