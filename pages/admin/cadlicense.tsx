import { useState } from 'react';
import { useRouter } from 'next/router';

interface FormFields {
  fullName: string;
  email: string;
  mobile: string;
  cpf: string;
  subscriptionStartDate: string;
  subscriptionStatus: string;
  orderStatus: string;
  orderId: string;
}

const KiwifyPage = () => {
  const router = useRouter();

  const [formFields, setFormFields] = useState<FormFields>({
    fullName: '',
    email: '',
    mobile: '',
    cpf: '',
    subscriptionStartDate: '',
    subscriptionStatus: '',
    orderStatus: '',
    orderId: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormFields((prevFields) => ({ ...prevFields, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const customerData = {
      full_name: formFields.fullName,
      email: formFields.email,
      mobile: formFields.mobile,
      CPF: formFields.cpf,
    };
    const subscriptionData = {
      start_date: new Date(formFields.subscriptionStartDate).toISOString(),
      status: formFields.subscriptionStatus,
    };
    const postData = {
      Customer: customerData,
      Subscription: subscriptionData,
      order_status: formFields.orderStatus,
      order_id: formFields.orderId,
    };
    const response = await fetch('/api/kiwify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });
    const data = await response.json();
    if (response.ok) {
      alert('Licença adicionada com sucesso!');
      router.push('/');
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="container">
      <h1>Kiwify</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nome completo:
          <input type="text" name="fullName" value={formFields.fullName} onChange={handleInputChange} required />
        </label>
        <label>
          E-mail:
          <input type="email" name="email" value={formFields.email} onChange={handleInputChange} required />
        </label>
        <label>
          Telefone:
          <input type="tel" name="mobile" value={formFields.mobile} onChange={handleInputChange} required />
        </label>
        <label>
          CPF:
          <input type="text" name="cpf" value={formFields.cpf} onChange={handleInputChange} required />
        </label>
        <label>
          Data de início da assinatura:
          <input type="date" name="subscriptionStartDate" value={formFields.subscriptionStartDate} onChange={handleInputChange} required />
        </label>
        <label>
          Status da assinatura:
          <input type="text" name="subscriptionStatus" value={formFields.subscriptionStatus} onChange={handleInputChange} required />
        </label>
        <label>
          Status do pedido:
          <input type="text" name="orderStatus" value={formFields.orderStatus} onChange={handleInputChange} required />
        </label>
        <label>
          ID do pedido:
          <input type="text" name="orderId" value={formFields.orderId} onChange={handleInputChange} required />
        </label>
        <button type="submit">Enviar</button>
      </form>
   </div>

  );
};

export default KiwifyPage;
