// import { Card, CardContent } from "./ui/card";

// interface BookingSummeryProps {

// }

// const BookingSummery = () => {
//     return (
//         <div className="p-5">
//                       <Card>
//                         <CardContent className="space-y-3 p-3">
//                           <div className="flex items-center justify-between">
//                             <h2 className="font-bold">{service.name}</h2>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <h2 className="text-sm text-gray-400">Data:</h2>
//                             <p className="text-sm text-gray-300">
//                               {format(selectedDay, "d 'de' MMMM 'de' yyyy", {
//                                 locale: ptBR,
//                               })}
//                             </p>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <h2 className="text-sm text-gray-400">Horário:</h2>
//                             <p className="text-sm text-gray-300">
//                               {selectedTime}
//                             </p>
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <h2 className="text-sm text-gray-400">
//                               Instituição:
//                             </h2>
//                             <p className="text-sm text-gray-300">
//                               {educationalInstitution.name}
//                             </p>
//                           </div>
//                           <div className="mt-3 flex items-center justify-between">
//                             <h2 className="text-sm text-gray-400">
//                               Sala de aula:
//                             </h2>
//                             <Input
//                               required
//                               type="text"
//                               placeholder="Digite a sala de aula"
//                               className="w-40 rounded bg-gray-800 px-2 py-1 text-center text-sm text-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
//                               value={classroom}
//                               onChange={(e) => setClassroom(e.target.value)}
//                             />
//                           </div>
//                         </CardContent>
//                       </Card>
//                     </div>
//      );
// }

// export default BookingSummery;
