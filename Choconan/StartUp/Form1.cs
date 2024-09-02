using System.Windows.Forms;

namespace StartUp
{
  public partial class FormStartUp : Form
  {
    public FormStartUp()
    {
      InitializeComponent();
    }

    private void buttonGoToAccount_Click(object sender, System.EventArgs e)
    {
      string url = "https://choconan.ir/account";
      System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
      {
        FileName = url,
        UseShellExecute = true
      });
    }

    private void buttonGoToAccountOrder_Click(object sender, System.EventArgs e)
    {
      string url = "https://choconan.ir/account/order";
      System.Diagnostics.Process.Start(new System.Diagnostics.ProcessStartInfo
      {
        FileName = url,
        UseShellExecute = true
      });
    }
  }
}
