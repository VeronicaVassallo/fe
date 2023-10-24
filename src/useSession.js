import jwtDecode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { isAuth } from "./middlewares/ProtectedRoutes";

const useSession = () => {
	const session = isAuth();
	const decodedSession = session ? jwtDecode(session) : null;

	const navigate = useNavigate();
	/*Se non c'è la sessione (ossia non siamo authorizzati) 
    navigate '/' cosi non puo piu andare avanti o indietro 
    nel browser Gli cancelliamo la history
*/

	//Questa funzione non ci prende altro che la decodedSession.exp che è exp se faccio il console della seccion nell'home
	//lo vedi exp lo moltiplicamo in millisendi per mille
	//expirationDate --> qui ci viene data la data
	//currentDate ---> mi prendo la data odierna
	const checkTokenExpirationTime = () => {
		const convertUnixDateToMillisecond = decodedSession.exp * 1000;
		const expirationDate = new Date(convertUnixDateToMillisecond); // se fai il console ti dice quando scade il tuo token expirationDate
		const currentDate = new Date();
		//se expirationDate è minore della data corrente pulisci il localStorage
		if (expirationDate < currentDate) {
			//qui gli forziamo la cancellazione del nostro localStorage
			localStorage.clear();
		}
	};

	useEffect(() => {
		if (!session) {
			navigate("/", { replace: true });
		}
		checkTokenExpirationTime();
	}, [navigate, session]);

	return decodedSession;
};
export default useSession;
